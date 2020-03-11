import {Injectable} from '@angular/core';
import {DebtModel} from '../models/debt.model';
import {Subject} from 'rxjs';
import {DebtStrategyReportModel} from '../models/debt-strategy-report.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class DebtPayoffService {

  debtsListChanged = new Subject<DebtModel[]>();
  debtCreated = new Subject<void>();
  debtStrategyReportsChanged = new Subject<DebtStrategyReportModel[]>();

  private debtsList: DebtModel[] = [];
  private debtStrategyReports: DebtStrategyReportModel[] = [];

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  createDebt(debt: DebtModel) {
    const url = `${this.baseUrl}/debts`;
    this.httpClient.post<DebtModel>(url, debt)
      .subscribe(d => {
        this.debtCreated.next();
        this.getDebtsList();
      });
  }

  getDebtsList() {
    const url = `${this.baseUrl}/debts`;
    this.httpClient.get<DebtModel[]>(url).subscribe(debts => {
      this.getDebtStrategyReports();
      this.debtsListChanged.next(debts);
    });
  }

  getDebtStrategyReports() {
    const url = `${this.baseUrl}/debts/payoff`;
    const params = new HttpParams().set('extraPayment', environment.extraPayment.toString());
    this.httpClient.get<DebtStrategyReportModel[]>(url, {params: params})
      .subscribe(reports => {
      this.debtStrategyReports = reports;
      this.debtStrategyReportsChanged.next(reports);
    });
  }
}
