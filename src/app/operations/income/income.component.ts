import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {Account} from '../../models/account.model';
import {Category} from '../../models/category.model';
import {Subcategory} from '../../models/subcategory.model';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../services/utility.service';
import {TransactionsService} from '../../services/transactions.service';

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
        this.incomeForm.reset({'date': new Date(), 'type': 'INCOME'});
        // this.uiService.openSnackBar(`${trans.type} has been created`, null, 5000);
        // this.summaryService.getBrief();
        // this.router.navigate(['main', 'dashboard', 'summaries']);
    }));
    this.utilityService.getAllCategories();
    this.utilityService.getAllAccounts();
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
      this.utilityService.getAllSubcategories(categoryId);
      this.incomeForm.controls['subCategory'].enable();
    }
  }

  onAccCreated(accId: number) {
    this.incomeForm.patchValue({account: accId});
  }

  onCategoryCreated(catId: number) {
    this.incomeForm.patchValue({category: catId});
    this.onSelectCategory(catId);
  }

  onSubCategoryCreated(subId: number) {
    this.incomeForm.patchValue({subCategory: subId});
  }

  onSubmit() {
    const acc = this.accounts.find(account => {
      return account.id === +this.incomeForm.value.account;
    });
    const cat = this.categories.find(category => {
      return category.id === +this.incomeForm.value.category;
    });
    const subcat = this.subcategories.find(subcategory => {
      return subcategory.id === +this.incomeForm.value.subCategory;
    });

    this.incomeForm.patchValue({account: acc, category: cat, subCategory: subcat});
    this.transactionsService.createTransaction(this.incomeForm.value);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
