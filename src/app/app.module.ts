import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExpenseComponent} from './operations/expense/expense.component';
import {OperationsComponent} from './operations/operations.component';
import {IncomeComponent} from './operations/income/income.component';
import {TransferComponent} from './operations/transfer/transfer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UtilityService} from './services/utility.service';
import {SummariesService} from './services/summaries.service';
import {AuthInterceptor} from './services/auth.interceptor';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {TransactionsService} from './services/transactions.service';
import {SortableDirective} from './transactions-list/sortable.directive';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';
import {BriefComponent} from './brief/brief.component';
import {HeaderComponent} from './navigation/header/header.component';
import {SummaryAccComponent} from './summary/summary-acc/summary-acc.component';
import {SummaryComponent} from './summary/summary.component';
import {SummaryExpIncComponent} from './summary/summary-exp-inc/summary-exp-inc.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faAngleDoubleDown, faAngleLeft, faAngleRight, faCalendarAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {LanuMonthPaginatorComponent} from './shared/lanu-month-paginator/lanu-month-paginator.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import { MainComponent } from './main/main.component';
import { OperationsPageComponent } from './pages/operations-page/operations-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddAccountComponent } from './modals/add-account/add-account.component';
import { AddCategoryComponent } from './modals/add-category/add-category.component';
import { AddSubcategoryComponent } from './modals/add-subcategory/add-subcategory.component';

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
    SummaryPageComponent,
    WelcomePageComponent,
    MainComponent,
    OperationsPageComponent,
    DashboardComponent,
    AddAccountComponent,
    AddCategoryComponent,
    AddSubcategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [UtilityService, SummariesService, TransactionsService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
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
