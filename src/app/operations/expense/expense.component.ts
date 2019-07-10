import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {OperationsService} from '../../services/operations.service';
import {Category} from '../../models/category.model';
import {Subcategory} from '../../models/subcategory.model';
import {Account} from '../../models/account.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ExpenseComponent implements OnInit {

  expenseForm: FormGroup;

  accounts: Account[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategoryId: number;
  typeCategory = 'EXPENSE';

  componentSubs: Subscription[] = [];

  constructor(private operationsService: OperationsService) {}

  ngOnInit(): void {
    this.initForm();
    this.componentSubs.push(this.operationsService.accountsChanged
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      }));
    this.componentSubs.push(this.operationsService.categoryChanged
      .subscribe((categories: Category[]) => {
        console.log(categories);
        this.categories = categories.filter(category => {
          return category.type === this.typeCategory;
        });
      }));
    this.componentSubs.push(this.operationsService.subcategoryChanged
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      }));
    this.operationsService.getAllCategories();
    this.operationsService.getAllAccounts();
  }

  private initForm() {
    this.expenseForm = new FormGroup({
      date: new FormControl(new Date(), Validators.required),
      type: new FormControl('EXPENSE'),
      amount: new FormControl(null, Validators.required),
      account: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      subCategory: new FormControl(null, Validators.required),
      description: new FormControl()
    });
    this.expenseForm.controls['subCategory'].disable();
  }

  onSelectCategory(categoryId) {
    // check if button hasn't been clicked
    if (categoryId) {
      this.selectedCategoryId = categoryId;
      this.operationsService.getAllSubcategories(categoryId);
      this.expenseForm.controls['subCategory'].enable();
    }
  }

  onSubmit() {
    const acc = this.accounts.find(account => {
      return account.id === +this.expenseForm.value.account;
    });
    const cat = this.categories.find(category => {
      console.log(category);
      return category.id === +this.expenseForm.value.category;
    });
    const subcat = this.subcategories.find(subcategory => {
      return subcategory.id === +this.expenseForm.value.subCategory;
    });
    this.expenseForm.patchValue({amount: -this.expenseForm.value.amount});
    this.expenseForm.patchValue({account: acc, category: cat, subCategory: subcat});
    console.log(this.expenseForm.value);
    this.componentSubs.push(this.operationsService.createTransaction(this.expenseForm.value)
      .subscribe(transaction => {
        this.expenseForm.reset({'date': new Date(), 'type': 'EXPENSE'});
        // this.uiService.openSnackBar('Expense has been created', null, 5000);
        // this.summaryService.getBrief();
        // this.router.navigate(['main', 'dashboard', 'summaries']);
      }));
  }

}
