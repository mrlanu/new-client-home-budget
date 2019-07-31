import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Brief} from '../models/brief';
import {YearMonthSum} from '../models/year-month-sum';

@Injectable()
export class SummariesService {

  baseUrl = environment.baseUrl;

  briefChanged = new Subject<Brief>();
  spentMonthToMonthByCategoryChange = new Subject<YearMonthSum>();

  constructor(private httpClient: HttpClient) { }

  getBrief() {
    const url = `${this.baseUrl}/summaries/brief`;
    this.httpClient.get<Brief>(url)
      .subscribe(brief => {
        this.briefChanged.next(brief);
    });
  }

  getSumsOfIncomesExpensesForYearByMonth() {
    const url = `${this.baseUrl}/charts/sumsOfIncomesExpensesForYearByMonth`;
    return this.httpClient.get(url);
  }

  getSpentMonthToMonthByCategory(categoryId: number) {
    const url = `${this.baseUrl}/charts/spentMonthToMonthByCategory`;
    const params = new HttpParams().set('categoryId', categoryId.toString());
    this.httpClient.get(url, {params}).subscribe((res: YearMonthSum) => {
      this.spentMonthToMonthByCategoryChange.next(res);
    });
  }
}
