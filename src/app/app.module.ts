import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExpenceComponent} from './operations/expence/expence.component';
import {OperationsComponent} from './operations/operations.component';
import {IncomeComponent} from './operations/income/income.component';
import {TransferComponent} from './operations/transfer/transfer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExpenceComponent,
    OperationsComponent,
    IncomeComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
