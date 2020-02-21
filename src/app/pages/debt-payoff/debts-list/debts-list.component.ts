import { Component, OnInit } from '@angular/core';
import {DebtModel} from '../../../models/debt.model';

@Component({
  selector: 'app-debts-list',
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.css']
})
export class DebtsListComponent implements OnInit {

  debtsList: DebtModel[] =
    [{name: 'City VISA', apr: 12, currentBalance: 1870, minimumPayment: 100, nextPaymentDue: new Date(),
      paymentsList: [], startBalance: 2000},
    {name: 'BofA MASTER CARD TEST TEST', apr: 12, currentBalance: 1000, minimumPayment: 100, nextPaymentDue: new Date(),
      paymentsList: [{amount: 20, date: new Date()}], startBalance: 2000}];

  constructor() { }

  ngOnInit() {
  }

}
