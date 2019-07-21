import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../services/utility.service';
import {Category} from '../../models/category.model';
import {Subcategory} from '../../models/subcategory.model';
import {Account} from '../../models/account.model';
import {TransactionsService} from '../../services/transactions.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ExpenseComponent implements OnInit, OnDestroy {

  expenseForm: FormGroup;

  accounts: Account[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategoryId: number;
  typeCategory = 'EXPENSE';

  componentSubs: Subscription[] = [];

  constructor(private utilityService: UtilityService, private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.initForm();
    this.componentSubs.push(this.utilityService.accountsChanged
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      }));
    this.componentSubs.push(this.utilityService.categoryChanged
      .subscribe((categories: Category[]) => {
        this.categories = categories.filter(category => {
          return category.type === this.typeCategory;
        });
      }));
    this.componentSubs.push(this.utilityService.subcategoryChanged
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      }));
    this.componentSubs.push(this.transactionsService.transactionAdded
      .subscribe(trans => {
        this.expenseForm.reset({'date': new Date(), 'type': 'EXPENSE'});
        // this.uiService.openSnackBar(`${trans.type} has been created`, null, 5000);
        // this.summaryService.getBrief();
        // this.router.navigate(['main', 'dashboard', 'summaries']);
      }));
    this.utilityService.getAllCategories();
    this.utilityService.getAllAccounts();
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
      this.utilityService.getAllSubcategories(categoryId);
      this.expenseForm.controls['subCategory'].enable();
    }
  }

  onAccCreated(accId: number) {
    this.expenseForm.patchValue({account: accId});
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
    this.transactionsService.createTransaction(this.expenseForm.value);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
