import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupAccount} from '../../models/group-account.model';
import {Subscription} from 'rxjs';
import {SummariesService} from '../../services/summaries.service';

@Component({
  selector: 'app-summary-acc',
  templateUrl: './summary-acc.component.html',
  styleUrls: ['./summary-acc.component.css']
})
export class SummaryAccComponent implements OnInit, OnDestroy {

  summaryTotal = 0;
  accountsGroups: GroupAccount[] = [];
  componentSubs: Subscription[] = [];

  constructor(private summariesService: SummariesService) { }

  ngOnInit() {
    this.componentSubs.push(this.summariesService.groupsChanged
      .subscribe((groups: GroupAccount[]) => {
        this.accountsGroups = groups;
        this.getSummaryTotal();
    }));
    this.summariesService.getSummaryByAccounts();
  }

  private getSummaryTotal() {
    this.accountsGroups.forEach(group => {
      group.accountList.forEach(acc => {
        if (acc.includeInTotal) {
          this.summaryTotal += acc.balance;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
