import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {GroupAccount} from '../models/group-account.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Brief} from '../models/brief';

@Injectable()
export class SummariesService {
  baseUrl = environment.baseUrl;
  groupsChanged = new Subject<GroupAccount[]>();
  briefChanged = new Subject<Brief>();

  constructor(private httpClient: HttpClient) { }

  getSummaryByAccounts() {
    const budgetId = 1;
    const url = `${this.baseUrl}/summaries/accounts`;
    const params = new HttpParams().set('budgetId', budgetId.toString());
    this.httpClient.get(url, {params}).subscribe((groups: GroupAccount[]) => {
      this.groupsChanged.next(groups);
    });
  }

  getBrief() {
    const url = `${this.baseUrl}/summaries/brief`;
    this.httpClient.get<Brief>(url)
      .subscribe(brief => {
        this.briefChanged.next(brief);
    });
  }
}
