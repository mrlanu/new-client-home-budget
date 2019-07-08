import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountModel} from '../expence/expence.component';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class IncomeComponent implements OnInit {

  accounts: AccountModel[] = [{id: 1, name: 'Chase', type: 'Saving'}, {id: 2, name: 'BofA', type: 'Saving'}];
  expenseForm: FormGroup;

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      date: new FormControl(new Date()),
      amount: new FormControl(0.0),
      account: new FormControl('Account...'),
      category: new FormControl(),
      subcategory: new FormControl(),
      description: new FormControl()
    });
  }

  onSubmit() {
    console.log(this.expenseForm.value);
  }

}
