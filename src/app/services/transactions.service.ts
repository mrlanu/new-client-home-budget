import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {TransactionView} from '../models/transaction-view.model';

@Injectable()
export class TransactionsService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.baseUrl;
  transactionsListChanged = new Subject<TransactionView[]>();

  getAllTransactions(date: Date) {
    const url = `${this.baseUrl}/transactions`;
    const params = new HttpParams().set('date', date.toString());
    this.httpClient.get<TransactionView[]>(url, { params })
      .subscribe(trans => {
      this.transactionsListChanged.next(trans);
    });
  }
}
