import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

export interface AccountModel {
  id: number;
  type: string;
  name: string;
}

@Component({
  selector: 'app-expence',
  templateUrl: './expence.component.html',
  styleUrls: ['./expence.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ExpenceComponent implements OnInit {

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
