import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SummariesService} from '../../../services/summaries.service';
import {UtilityService} from '../../../services/utility.service';
import {Category} from '../../../models/category.model';
import {YearMonthSum} from '../../../models/year-month-sum';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  categories: Category[] = [];
  selectedCategoryId: number;
  category = 'Nothing';
  result: YearMonthSum[] = [];

  // lineChart
  public lineChartData: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Spent'},
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // red grey
      backgroundColor: 'rgba(255,76,53,0.3)',
      borderColor: 'rgba(230,58,41,1)',
      pointBackgroundColor: 'rgba(255,76,53,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private summariesService: SummariesService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.componentSubs.push(this.utilityService.categoriesChanged
      .subscribe((categories: Category[]) => {
        this.categories = categories.filter(category => {
          return category.type === 'EXPENSE';
        });
      }));
    this.componentSubs.push(this.summariesService.spentMonthToMonthByCategoryChange
      .subscribe((result: YearMonthSum[]) => {
        this.lineChartData[0].data = result.map(r => -r.expenseSum);
        this.lineChartLabels = result.map(r => r.date);
        this.category = this.categories.find(c => {
          return c.id === +this.selectedCategoryId;
        }).name;
        this.result = result.reverse();
      }));
    this.utilityService.getAllCategories();
  }

  onSelectCategory(event) {
    this.summariesService.getSpentMonthToMonthByCategory(event);
    this.selectedCategoryId = event;
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
