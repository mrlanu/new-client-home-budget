import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Budget} from '../../models/budget.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {UtilityService} from '../../services/utility.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-budget',
  templateUrl: './select-budget.component.html',
  styleUrls: ['./select-budget.component.css']
})
export class SelectBudgetComponent implements OnInit, OnDestroy {
  @Output() budgetSelected = new EventEmitter<number>();
  budgets: Budget[] = [];
  componentSubs: Subscription[] = [];

  constructor(private utilityService: UtilityService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.componentSubs.push(this.utilityService.budgetsChange
      .subscribe((budgets: Budget[]) => {
        this.budgets = budgets;
      }));
    this.authService.getLoggedInUser();
    this.utilityService.getBudgetsByUser();
  }

  onBudgetSelect(budgetId: any) {
    environment.budgetId = budgetId;
    this.budgetSelected.emit(budgetId.value);
    this.router.navigate(['/main', 'dashboard']);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
