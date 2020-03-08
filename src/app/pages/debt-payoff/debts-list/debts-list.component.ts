import {Component, OnDestroy, OnInit} from '@angular/core';
import {DebtPayoffService} from '../../../services/debt-payoff.service';
import {DebtModel} from '../../../models/debt.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-debts-list',
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.css']
})
export class DebtsListComponent implements OnInit, OnDestroy {

  debtsList: DebtModel[] = [];
  componentSubs: Subscription[] = [];

  constructor(private debtPayoffService: DebtPayoffService) { }

  ngOnInit() {
    this.componentSubs.push(this.debtPayoffService.debtsListChanged
      .subscribe(debtsList => {
      this.debtsList = debtsList;
    }));
    this.debtPayoffService.getDebtsList();
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
