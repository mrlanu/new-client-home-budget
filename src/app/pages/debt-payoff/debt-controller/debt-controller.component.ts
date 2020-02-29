import {Component, OnDestroy, OnInit} from '@angular/core';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {DebtModel} from '../../../models/debt.model';
import {Subscription} from 'rxjs';
import {DebtPayoffService} from '../../../services/debt-payoff.service';

@Component({
  selector: 'app-debt-controller',
  templateUrl: './debt-controller.component.html',
  styleUrls: ['./debt-controller.component.css']
})
export class DebtControllerComponent implements OnInit, OnDestroy {

  faPlus = faPlus;
  strategy = [
    {
      'name': 'Avalanche',
      'description': 'APR high to low',
      'value': '0'
    },
    {
      'name': 'Snowball',
      'description': 'Balance low to high',
      'value': '1'
    }
  ];

  debtsList: DebtModel[] = [];
  sumMinPayment = 0;
  extraPayment = 0;
  totalPayment = 0;
  componentSubs: Subscription[] = [];

  constructor(private debtPayoffService: DebtPayoffService) { }

  ngOnInit() {
    this.componentSubs.push(this.debtPayoffService.debtsListChanged
      .subscribe(debtsList => {
        this.debtsList = debtsList;
        this.sumMinPayment = debtsList.reduce((a, b) => a + b.minimumPayment, 0);
        this.totalPayment = this.sumMinPayment + this.extraPayment;
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onExtraPaymentChange(event) {
    let sum = 0;
    if (event.target.valueAsNumber && event.target.valueAsNumber > 0) {
      sum = event.target.valueAsNumber;
    }
    this.totalPayment = this.sumMinPayment + sum;
    console.log(event.target.valueAsNumber);
  }

}
