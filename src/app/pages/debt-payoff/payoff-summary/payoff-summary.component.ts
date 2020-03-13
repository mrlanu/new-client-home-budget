import {Component, OnDestroy, OnInit} from '@angular/core';
import {DebtPayoffService} from '../../../services/debt-payoff.service';
import {Subscription} from 'rxjs';
import {DebtPayoffStrategyModel} from '../../../models/debt-payoff-strategy.model';

@Component({
  selector: 'app-payoff-summary',
  templateUrl: './payoff-summary.component.html',
  styleUrls: ['./payoff-summary.component.css']
})
export class PayoffSummaryComponent implements OnInit, OnDestroy {

  strategyReport: DebtPayoffStrategyModel;
  componentSubs: Subscription[] = [];

  constructor(private debtPayoffService: DebtPayoffService) { }

  ngOnInit() {
    this.componentSubs.push(this.debtPayoffService.debtStrategyReportsChanged
      .subscribe((report) => {
        this.strategyReport = report;
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
