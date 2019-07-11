import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {Account} from '../../models/account.model';
import {Category} from '../../models/category.model';
import {Subcategory} from '../../models/subcategory.model';
import {Subscription} from 'rxjs';
import {OperationsService} from '../../services/operations.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class IncomeComponent implements OnInit, OnDestroy {

  incomeForm: FormGroup;

  accounts: Account[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategoryId: number;
  typeCategory = 'INCOME';

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
    this.incomeForm = new FormGroup({
      date: new FormControl(new Date(), Validators.required),
      type: new FormControl('INCOME'),
      amount: new FormControl(null, Validators.required),
      account: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      subCategory: new FormControl(null, Validators.required),
      description: new FormControl()
    });
    this.incomeForm.controls['subCategory'].disable();
  }

  onSelectCategory(categoryId) {
    // check if button hasn't been clicked
    if (categoryId) {
      this.selectedCategoryId = categoryId;
      this.operationsService.getAllSubcategories(categoryId);
      this.incomeForm.controls['subCategory'].enable();
    }
  }

  onSubmit() {
    const acc = this.accounts.find(account => {
      return account.id === +this.incomeForm.value.account;
    });
    const cat = this.categories.find(category => {
      console.log(category);
      return category.id === +this.incomeForm.value.category;
    });
    const subcat = this.subcategories.find(subcategory => {
      return subcategory.id === +this.incomeForm.value.subCategory;
    });

    this.incomeForm.patchValue({account: acc, category: cat, subCategory: subcat});
    console.log(this.incomeForm.value);
    this.componentSubs.push(this.operationsService.createTransaction(this.incomeForm.value)
      .subscribe(transaction => {
        this.incomeForm.reset({'date': new Date(), 'type': 'INCOME'});
        // this.uiService.openSnackBar('Expense has been created', null, 5000);
        // this.summaryService.getBrief();
        // this.router.navigate(['main', 'dashboard', 'summaries']);
      }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
