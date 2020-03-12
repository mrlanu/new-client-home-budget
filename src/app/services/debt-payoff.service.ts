import {Injectable} from '@angular/core';
import {DebtModel} from '../models/debt.model';
import {Subject} from 'rxjs';
import {DebtStrategyReportModel} from '../models/debt-strategy-report.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DebtPayoffStrategyModel} from '../models/debt-payoff-strategy.model';

@Injectable()
export class DebtPayoffService {

  debtsListChanged = new Subject<DebtModel[]>();
  debtCreated = new Subject<void>();
  debtStrategyReportsChanged = new Subject<DebtPayoffStrategyModel>();
  debtSelected = new Subject<DebtModel>();

  extraPayment = 0;
  strategy = 'Avalanche';

  private debtPayoffStrategy: DebtPayoffStrategyModel;
  private debtsList: DebtModel[] = [];

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

  editDebt(debt: DebtModel) {
    const url = `${this.baseUrl}/debts`;
    this.httpClient.put<DebtModel>(url, debt)
      .subscribe(d => {
        this.debtCreated.next();
        this.getDebtsList();
      });
  }

  getDebtsList() {
    const url = `${this.baseUrl}/debts`;
    this.httpClient.get<DebtModel[]>(url).subscribe(debts => {
      this.debtsList = debts;
      this.debtsListChanged.next(debts);
      this.getDebtStrategyReports();
    });
  }

  getDebtById(debtId: number) {
    const debt = this.debtsList.find(d => d.id === debtId);
    this.debtSelected.next(debt);
  }

  deleteDebt(debtId: number) {
    const url = `${this.baseUrl}/debts`;
    const params = new HttpParams().set('debtId', debtId.toString());
    this.httpClient.delete(url, {params: params}).subscribe(() => {
      this.getDebtsList();
    });
  }

  getDebtStrategyReports() {
    const url = `${this.baseUrl}/debts/payoff`;
    const params = new HttpParams().set('extraPayment', this.extraPayment.toString()).set('strategy', this.strategy);
    this.httpClient.get<DebtPayoffStrategyModel>(url, {params: params})
      .subscribe(strategy => {
      this.debtPayoffStrategy = strategy;
      this.debtStrategyReportsChanged.next(strategy);
    });
  }
}
