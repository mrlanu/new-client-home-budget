import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {Account} from '../../models/account.model';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class IncomeComponent implements OnInit {

  accounts: Account[] = [];
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
