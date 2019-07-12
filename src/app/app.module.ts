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
import {SummaryComponent} from './summary/summary.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TestGridComponent} from './test-grid/test-grid.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UtilityService} from './services/utility.service';
import {SummariesService} from './services/summaries.service';
import {AuthInterceptor} from './services/auth.interceptor';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {TransactionsService} from './services/transactions.service';
import {SortableDirective} from './transactions-list/sortable.directive';
import {SidebarComponent} from './navigation/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    OperationsComponent,
    IncomeComponent,
    TransferComponent,
    SummaryComponent,
    TestGridComponent,
    TransactionsListComponent,
    SortableDirective,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [UtilityService, SummariesService, TransactionsService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
