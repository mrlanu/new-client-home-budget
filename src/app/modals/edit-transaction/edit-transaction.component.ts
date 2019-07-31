import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/category.model';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../services/utility.service';
import {TransactionView} from '../../models/transaction-view.model';
import {TransactionsService} from '../../services/transactions.service';
import {Transaction} from '../../models/transaction.model';
import {Transfer} from '../../models/transfer.model';
import {Account} from '../../models/account.model';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  @Input() transactionForEdit: TransactionView;
  transForm: FormGroup;
  transfForm: FormGroup;
  componentSubs: Subscription[] = [];
  transferSelected = false;

  categories: Category[] = [];
  accounts: Account[] = [];

  constructor(private utilityService: UtilityService, private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.initTransForm();
    this.initTransfForm();
    this.componentSubs.push(this.transactionsService.transactionChanged
      .subscribe((trans: Transaction) => {
        this.transferSelected = false;
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
    this.componentSubs.push(this.transactionsService.transferChanged
      .subscribe((transfer: Transfer) => {
        this.transferSelected = true;
        this.accounts = this.utilityService.accounts;
        this.transfForm.patchValue({
          id: transfer.id,
          date: new Date(transfer.date),
          fromAccount: transfer.fromAccount.id,
          toAccount: transfer.toAccount.id,
          amount: transfer.amount
        });
      }));
  }

  initTransForm() {
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

  initTransfForm() {
    this.transfForm = new FormGroup({
      id: new FormControl(),
      date: new FormControl(new Date(), Validators.required),
      amount: new FormControl(null, Validators.required),
      fromAccount: new FormControl(null, Validators.required),
      toAccount: new FormControl(null, Validators.required)
    });
  }

  onSelectCategory(categoryId) {
    if (categoryId) {
      this.utilityService.getAllSubcategories(categoryId);
    }
  }

  onSelectFromAcc(s: any) {
    console.log(s);
  }

  onSubmit(from: string) {
    if (from === 'TRANSACTION') {
      if (this.transForm.value.type === 'EXPENSE') {
        this.transForm.patchValue({amount: -this.transForm.value.amount});
      }
      this.transForm.patchValue({
        account: this.utilityService.accounts.find(account => {
          return account.id === +this.transForm.value.account;
        }),
        category: this.utilityService.categories.find(category => {
          return category.id === +this.transForm.value.category;
        }),
        subCategory: this.utilityService.subcategories.find(subcategory => {
          return subcategory.id === +this.transForm.value.subCategory;
        })
      });
      this.transactionsService.editTransaction(this.transForm.value);

    } else if (from === 'TRANSFER') {
      this.transfForm.patchValue({
        'fromAccount': this.accounts.find(acc => {
          return acc.id === this.transfForm.value.fromAccount;
        }),
        'toAccount': this.accounts.find(acc => {
          return acc.id === this.transfForm.value.toAccount;
        })
      });
      this.transactionsService.editTransfer(this.transfForm.value);
    }
  }

}
