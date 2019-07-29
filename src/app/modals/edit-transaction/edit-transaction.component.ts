import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/category.model';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../services/utility.service';
import {TransactionView} from '../../models/transaction-view.model';
import {TransactionsService} from '../../services/transactions.service';
import {Transaction} from '../../models/transaction.model';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  @Input() transactionForEdit: TransactionView;
  transForm: FormGroup;
  componentSubs: Subscription[] = [];

  categories: Category[] = [];

  constructor(private utilityService: UtilityService, private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.initForm();
    this.componentSubs.push(this.transactionsService.transactionChanged
      .subscribe((trans: Transaction) => {
        this.categories = this.utilityService.categories.filter(category => {
          return trans.category.type === category.type;
        });
        this.utilityService.getAllSubcategories(trans.category.id);
        this.transForm.patchValue({
          id: trans.id,
          date: new Date(trans.date),
          type: trans.type,
          amount: trans.type === 'EXPENSE' ? -trans.amount : trans.amount,
          account: trans.account.id,
          category: trans.category.id,
          subCategory: trans.subCategory.id,
          description: trans.description
        });
    }));
  }

  initForm() {
    this.transForm = new FormGroup({
      id: new FormControl(),
      date: new FormControl(new Date(), Validators.required),
      type: new FormControl('EXPENSE'),
      amount: new FormControl(null, Validators.required),
      account: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      subCategory: new FormControl(null, Validators.required),
      description: new FormControl()
    });
  }

  onSelectCategory(categoryId) {
    if (categoryId) {
      this.utilityService.getAllSubcategories(categoryId);
    }
  }


  onSubmit() {
    const acc = this.utilityService.accounts.find(account => {
      return account.id === +this.transForm.value.account;
    });
    const cat = this.utilityService.categories.find(category => {
      return category.id === +this.transForm.value.category;
    });
    const subcat = this.utilityService.subcategories.find(subcategory => {
      return subcategory.id === +this.transForm.value.subCategory;
    });

    if (this.transForm.value.type === 'EXPENSE') {
      this.transForm.patchValue({amount: -this.transForm.value.amount});
    }

    this.transForm.patchValue({account: acc, category: cat, subCategory: subcat});
    this.transactionsService.editTransaction(this.transForm.value);
  }

}
