import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExpenseComponent} from './pages/dashboard/operations/expense/expense.component';
import {OperationsComponent} from './pages/dashboard/operations/operations.component';
import {IncomeComponent} from './pages/dashboard/operations/income/income.component';
import {TransferComponent} from './pages/dashboard/operations/transfer/transfer.component';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UtilityService} from './services/utility.service';
import {SummariesService} from './services/summaries.service';
import {TransactionsListComponent} from './pages/dashboard/transactions-list/transactions-list.component';
import {TransactionsService} from './services/transactions.service';
import {SortableDirective} from './pages/dashboard/transactions-list/sortable.directive';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import {BriefComponent} from './shared/brief/brief.component';
import {HeaderComponent} from './navigation/header/header.component';
import {SummaryAccComponent} from './pages/dashboard/summary/summary-acc/summary-acc.component';
import {SummaryComponent} from './pages/dashboard/summary/summary.component';
import {SummaryExpIncComponent} from './pages/dashboard/summary/summary-exp-inc/summary-exp-inc.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faAngleDoubleDown, faAngleLeft, faAngleRight, faCalendarAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {LanuMonthPaginatorComponent} from './shared/lanu-month-paginator/lanu-month-paginator.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddAccountComponent } from './shared/modals/add-account/add-account.component';
import { AddCategoryComponent } from './shared/modals/add-category/add-category.component';
import { AddSubcategoryComponent } from './shared/modals/add-subcategory/add-subcategory.component';
import { EditTransactionComponent } from './shared/modals/edit-transaction/edit-transaction.component';
import {BarChartComponent} from './pages/charts/bar-chart/bar-chart.component';
import {ChartsModule} from 'ng2-charts';
import {LineChartComponent} from './pages/charts/line-chart/line-chart.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthService} from './auth/auth.service';
import {UiService} from './services/ui.service';
import { SelectBudgetComponent } from './auth/select-budget/select-budget.component';
import {AuthInterceptor} from './auth/auth.interceptor';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { DebtPayoffComponent } from './pages/debt-payoff/debt-payoff.component';
import { DebtsListComponent } from './pages/debt-payoff/debts-list/debts-list.component';
import { DebtItemComponent } from './pages/debt-payoff/debts-list/debt-item/debt-item.component';
import { DebtControllerComponent } from './pages/debt-payoff/debt-controller/debt-controller.component';
import { DebtPayoffService } from './services/debt-payoff.service';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    OperationsComponent,
    IncomeComponent,
    TransferComponent,
    TransactionsListComponent,
    SortableDirective,
    SidebarComponent,
    BriefComponent,
    HeaderComponent,
    SummaryAccComponent,
    SummaryComponent,
    SummaryExpIncComponent,
    LanuMonthPaginatorComponent,
    WelcomePageComponent,
    MainComponent,
    DashboardComponent,
    AddAccountComponent,
    AddCategoryComponent,
    AddSubcategoryComponent,
    EditTransactionComponent,
    BarChartComponent,
    LineChartComponent,
    LoginComponent,
    SignupComponent,
    SelectBudgetComponent,
    UserDetailsComponent,
    DebtPayoffComponent,
    DebtsListComponent,
    DebtItemComponent,
    DebtControllerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FontAwesomeModule,
    ChartsModule,
    NgxDropzoneModule
  ],
  providers: [UtilityService, SummariesService, TransactionsService, AuthService, UiService, DebtPayoffService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faAngleLeft);
    library.add(faAngleRight);
    library.add(faPlus);
    library.add(faCalendarAlt);
    library.add(faAngleDoubleDown);
  }
}
