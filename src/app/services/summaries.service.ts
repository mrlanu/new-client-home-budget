import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {GroupAccount} from '../models/group-account.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Brief} from '../models/brief';
import {Group} from '../models/group.model';
import {TransactionView} from '../models/transaction-view.model';
import {GroupSubcategories} from '../models/group-subcategories.model';

@Injectable()
export class SummariesService {

  baseUrl = environment.baseUrl;

  transactionViews: TransactionView[] = [];
  transactionViewsChanged = new Subject<TransactionView[]>();

  groupsChanged = new Subject<GroupAccount[]>();
  briefChanged = new Subject<Brief>();
  categoryGroupsChanged = new Subject<Group[]>();

  constructor(private httpClient: HttpClient) { }

  getSummaryByAccounts() {
    const budgetId = 1;
    const url = `${this.baseUrl}/summaries/accounts`;
    const params = new HttpParams().set('budgetId', budgetId.toString());
    this.httpClient.get(url, {params}).subscribe((groups: GroupAccount[]) => {
      this.groupsChanged.next(groups);
    });
  }

  getSummaryByCategories(date: Date, type: string) {
    const url = `${this.baseUrl}/summaries/categories`;
    const params = new HttpParams().set('date', date.toString()).set('type', type);
    this.httpClient.get<Group[]>(url, { params })
      .subscribe(groups => {
        // this.groups = groups;
        this.mergeTransactionsViewFromGroups(groups);
        this.categoryGroupsChanged.next(groups);
      });
  }

  private mergeTransactionsViewFromGroups(groups: Group[]) {
    let result: TransactionView[] = [];
    groups.forEach((gr: Group) => {
      gr.groupSubcategoryList.forEach((sbcl: GroupSubcategories) => {
        result = [...result, ...sbcl.transactionList];
      });
    });
    this.transactionViews = result;
    this.transactionViewsChanged.next(result);
  }

  getBrief() {
    const url = `${this.baseUrl}/summaries/brief`;
    this.httpClient.get<Brief>(url)
      .subscribe(brief => {
        this.briefChanged.next(brief);
    });
  }
}
