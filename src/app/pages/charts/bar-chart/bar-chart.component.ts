import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {YearMonthSum} from '../../../models/year-month-sum';
import {SummariesService} from '../../../services/summaries.service';


declare var $: any;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];

  // lineChart
  public barChartData: Array<any> = [
    {data: [], label: 'Incomes'},
    {data: [], label: 'Expenses'}
  ];
  public barChartLabels: Array<any> = [];
  public barChartOptions: any = {
    responsive: true
  };
  public barChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(0,79,67,0.6)',
      borderColor: 'rgba(0,79,67,1)',
      pointBackgroundColor: 'rgba(0,79,67,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(255,76,53,0.6)',
      borderColor: 'rgba(230,58,41,1)',
      pointBackgroundColor: 'rgba(255,76,53,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public barChartLegend = true;
  public barChartType = 'bar';

  constructor(private summariesService: SummariesService) { }

  ngOnInit() {
    this.componentSubs.push(this.summariesService.getSumsOfIncomesExpensesForYearByMonth()
      .subscribe((result: YearMonthSum[]) => {
        this.barChartData[0].data = result.map(r => r.incomeSum);
        this.barChartData[1].data = result.map(r => -r.expenseSum);
        this.barChartLabels = result.map(r => r.date);
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
