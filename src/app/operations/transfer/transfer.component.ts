import { Component, OnInit } from '@angular/core';
import {AccountModel} from '../expence/expence.component';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TransferComponent implements OnInit {

  accounts: AccountModel[] = [{id: 1, name: 'Chase', type: 'Saving'}, {id: 2, name: 'BofA', type: 'Saving'}];
  expenseForm: FormGroup;

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      date: new FormControl(new Date()),
      amount: new FormControl(0.0),
      accountFrom: new FormControl('Account...'),
      accountTo: new FormControl('Account...')
    });
  }

  onSubmit() {
    console.log(this.expenseForm.value);
  }

}
