import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GroupAccount} from '../../../../models/group-account.model';
import {TransactionsService} from '../../../../services/transactions.service';

@Component({
  selector: 'app-summary-acc',
  templateUrl: './summary-acc.component.html',
  styleUrls: ['./summary-acc.component.css']
})
export class SummaryAccComponent implements OnInit, OnDestroy {

  summaryTotal = 0;
  accountsGroups: GroupAccount[] = [];
  componentSubs: Subscription[] = [];

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.componentSubs.push(this.transactionsService.accGroupsChanged
      .subscribe((groups: GroupAccount[]) => {
        this.accountsGroups = groups;
        this.getSummaryTotal();
    }));
    this.transactionsService.getSummaryByAccounts();
    this.transactionsService.getAllTransactions(new Date());
  }

  private getSummaryTotal() {
    this.summaryTotal = 0;
    this.accountsGroups.forEach(group => {
      group.accountList.forEach(acc => {
        if (acc.includeInTotal) {
          this.summaryTotal += acc.balance;
        }
      });
    });
  }

  onAccountTypeSelect(accountName: string) {
    this.transactionsService.filterTransactionsViewByAccountType(accountName);
  }

  onAccountSelect(accountName: string) {
    this.transactionsService.filterTransactionsViewByAccount(accountName);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
