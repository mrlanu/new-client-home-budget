import {Injectable} from '@angular/core';
import {DebtModel} from '../models/debt.model';
import {Subject} from 'rxjs';
import {DebtStrategyReportModel} from '../models/debt-strategy-report.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class DebtPayoffService {

  debtsListChanged = new Subject<DebtModel[]>();
  debtCreated = new Subject<void>();
  debtStrategyReportsChanged = new Subject<DebtStrategyReportModel[]>();

  private debtsList: DebtModel[] =
    [{publicId: 'test1', name: 'City VISA', apr: 12, currentBalance: 400, minimumPayment: 50, nextPaymentDue: new Date(),
      paymentsList: [], startBalance: 2000},
      // tslint:disable-next-line:max-line-length
      {publicId: 'test2', name: 'BofA MASTER CARD TEST TEST', apr: 12, currentBalance: 900, minimumPayment: 100, nextPaymentDue: new Date(),
        paymentsList: [{amount: 20, date: new Date()}], startBalance: 2000}];

  private debtStrategyReports: DebtStrategyReportModel[] = [];

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  createDebt(debt: DebtModel) {
    this.debtsList.push(debt);
    this.debtsListChanged.next(this.debtsList);
    this.debtCreated.next();
  }

  getDebtsList() {
    this.debtsListChanged.next(this.debtsList);
  }

  getDebtStrategyReports(debtsList: DebtModel[]) {
    const url = `${this.baseUrl}/debts/payoff`;
    this.httpClient.post<DebtStrategyReportModel[]>(url, this.debtsList)
      .subscribe(reports => {
      this.debtStrategyReports = reports;
      this.debtStrategyReportsChanged.next(reports);
      console.log(reports);
    });
  }
}
