import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Group} from '../../models/group.model';
import {TransactionsService} from '../../services/transactions.service';

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

  constructor(private transactionsService: TransactionsService, private router: Router) { }

  ngOnInit() {
    this.componentSubs.push(this.transactionsService.categoryGroupsChanged
      .subscribe((groups: Group[]) => {
        this.groups = groups;
        this.totalSpent = 0;
        this.groups.forEach(group => {
          group.groupSubcategoryList.forEach(subGroup => {
            this.totalSpent += subGroup.spent;
          });
        });
      }));
    this.transactionsService.getSummaryByCategories(new Date(), this.typeOfTransactions);
  }

  onMonthChange(date: Date) {
    this.transactionsService.getSummaryByCategories(date, this.typeOfTransactions);
  }

  onCategorySelect(categoryName: string) {
    this.transactionsService.filterTransactionsViewByCategory(categoryName, this.typeOfTransactions);
  }

  onSubcategorySelect(subcategoryName: string) {
    this.transactionsService.filterTransactionsViewBySubcategory(subcategoryName, this.typeOfTransactions);
  }

  onAdd() {
    this.router.navigate(['/main', 'dashboard', 'operations']);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }


}
