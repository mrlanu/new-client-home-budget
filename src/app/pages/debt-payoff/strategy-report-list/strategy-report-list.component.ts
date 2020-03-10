import {Component, OnDestroy, OnInit} from '@angular/core';
import {DebtPayoffService} from '../../../services/debt-payoff.service';
import {Subscription} from 'rxjs';
import {DebtStrategyReportModel} from '../../../models/debt-strategy-report.model';

@Component({
  selector: 'app-strategy-report-list',
  templateUrl: './strategy-report-list.component.html',
  styleUrls: ['./strategy-report-list.component.css']
})
export class StrategyReportListComponent implements OnInit, OnDestroy {

  reportsList: DebtStrategyReportModel[] = [];
  componentSubs: Subscription[] = [];

  constructor(private debtPayoffService: DebtPayoffService) { }

  ngOnInit() {
    this.componentSubs.push(this.debtPayoffService.debtStrategyReportsChanged
      .subscribe((reportsList: DebtStrategyReportModel[]) => {
        this.reportsList = reportsList;
      }));
    this.debtPayoffService.getDebtStrategyReports(null);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
