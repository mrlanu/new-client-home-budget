import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SummariesService} from '../../services/summaries.service';
import {Group} from '../../models/group.model';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-summary-exp-inc',
  templateUrl: './summary-exp-inc.component.html',
  styleUrls: ['./summary-exp-inc.component.css']
})
export class SummaryExpIncComponent implements OnInit, OnDestroy {

  @Input() typeOfTransactions = 'EXPENSE';
  groups: Group[] = [];
  componentSubs: Subscription[] = [];
  totalSpent: number;

  title = 'app';
  faCoffee = faCoffee;

  constructor(private summaryService: SummariesService, private router: Router) { }

  ngOnInit() {
    this.componentSubs.push(this.summaryService.categoryGroupsChanged
      .subscribe((groups: Group[]) => {
        console.log(groups);
        this.groups = groups;
        this.totalSpent = 0;
        this.groups.forEach(group => {
          group.groupSubcategoryList.forEach(subGroup => {
            this.totalSpent += subGroup.spent;
          });
        });
      }));
    this.summaryService.getSummaryByCategories(new Date(), this.typeOfTransactions);
  }

  onMonthChange(date: Date) {
    this.summaryService.getSummaryByCategories(date, this.typeOfTransactions);
  }

  /*onCategorySelect(categoryName: string) {
    this.summaryService.filterTransactionsViewByCategory(categoryName, this.typeOfTransactions);
  }*/

  /*onSubcategorySelect(subcategoryName: string) {
    this.summaryService.filterTransactionsViewBySubcategory(subcategoryName, this.typeOfTransactions);
  }*/

  onAdd() {
    this.router.navigate(['/main', 'dashboard', 'operations']);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      console.log('Destroy');
      sub.unsubscribe();
    });
  }


}
