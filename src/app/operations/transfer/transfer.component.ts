import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {Account} from '../../models/account.model';
import {Subscription} from 'rxjs';
import {TransactionsService} from '../../services/transactions.service';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TransferComponent implements OnInit, OnDestroy {

  transferForm: FormGroup;
  accounts: Account[] = [];
  fromAcca = true;

  componentSubs: Subscription[] = [];

  constructor(private transactionsService: TransactionsService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.initForm();
    this.componentSubs.push(this.utilityService.accountsChanged
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      }));
    this.componentSubs.push(this.transactionsService.transactionAdded
      .subscribe(res => {
        // this.uiService.openSnackBar('Transfer has been done', null, 5000);
        this.transferForm.reset({'date': new Date()});
      }));

    this.utilityService.getAllAccounts();
  }

  initForm() {
    this.transferForm = new FormGroup({
      date: new FormControl(new Date()),
      fromAccount: new FormControl(null, [Validators.required]),
      toAccount: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/)
      ]),
    });
    this.transferForm.controls['toAccount'].disable();
  }

  onAccCreated(accId: number) {
    console.log(this.fromAcca);
    if (this.fromAcca) {
      this.transferForm.patchValue({fromAccount: accId});
    } else {
      this.transferForm.patchValue({toAccount: accId});
    }
  }

  onSelectFromAcc() {
    this.transferForm.controls['toAccount'].enable();
  }

  onSubmit() {
    this.transferForm.patchValue({
      'fromAccount': this.accounts.find(acc => {
        return acc.id === +this.transferForm.value.fromAccount;
      }),
      'toAccount': this.accounts.find(acc => {
        return acc.id === +this.transferForm.value.toAccount;
      })
    });
    this.transactionsService.createTransfer(this.transferForm.value);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
