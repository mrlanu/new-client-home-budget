import { Component, OnInit } from '@angular/core';
import {GroupAccount} from '../models/group-account.model';
import {Account} from '../models/account.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  accountsSaving: Account[] = [
    {id: 1, name: 'Chase', type: 'Saving', includeInTotal: true, balance: 555.67, currency: 'USD', initialBalance: 0},
    {id: 2, name: 'BofA', type: 'Saving', includeInTotal: true, balance: 200.00, currency: 'USD', initialBalance: 0}

  ];

  accountsCash: Account[] = [
    {id: 3, name: 'Pocket', type: 'Cash', includeInTotal: true, balance: 100.00, currency: 'USD', initialBalance: 0},
    {id: 4, name: 'Nichka', type: 'Cash', includeInTotal: true, balance: 200.00, currency: 'USD', initialBalance: 0}

  ];
  accountsGroups: GroupAccount[] = [
    {name: 'Saving', accountList: this.accountsSaving, balance: 755.67},
    {name: 'Cash', accountList: this.accountsCash, balance: 300.00}
  ];

  constructor() { }

  ngOnInit() {
  }

}
