import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {TransactionView} from '../models/transaction-view.model';
import {SortDirection} from '../transactions-list/sortable.directive';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  transactions: TransactionView[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(transactions: TransactionView[], column: string, direction: string): TransactionView[] {
  if (direction === '') {
    return transactions;
  } else {
    return [...transactions].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(transaction: TransactionView, term: string) {
  return transaction.category.toLowerCase().includes(term)
    || transaction.subCategory.includes(term)
    || transaction.account.includes(term);
}

@Injectable()
export class TransactionsService {

  baseUrl = environment.baseUrl;
  transactionsList: TransactionView[] = [];
  transactionsListChanged = new Subject<TransactionView[]>();

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _transactions$ = new BehaviorSubject<TransactionView[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private httpClient: HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._transactions$.next(result.transactions);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  getAllTransactions(date: Date) {
    const url = `${this.baseUrl}/transactions`;
    const params = new HttpParams().set('date', date.toString());
    this.httpClient.get<TransactionView[]>(url, { params })
      .subscribe(trans => {
        this.transactionsList = trans;
        this._search$.next();
        this.transactionsListChanged.next(trans);
    });
  }

  get transactions$() { return this._transactions$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() {return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) {this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let transactions = sort(this.transactionsList, sortColumn, sortDirection);

    // 2. filter
    transactions = transactions.filter(transaction => matches(transaction, searchTerm));
    const total = transactions.length;

    // 3. paginate
    transactions = transactions.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({transactions, total});
  }
}
