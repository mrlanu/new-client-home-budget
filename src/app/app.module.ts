import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenceComponent } from './operations/expence/expence.component';
import { OperationsComponent } from './operations/operations.component';
import { IncomeComponent } from './operations/income/income.component';
import { TransferComponent } from './operations/transfer/transfer.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
