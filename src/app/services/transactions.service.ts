import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {TransactionView} from '../models/transaction-view.model';
import {SortDirection} from '../transactions-list/sortable.directive';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {Transaction} from '../models/transaction.model';
import {GroupAccount} from '../models/group-account.model';
import {Group} from '../models/group.model';
import {Transfer} from '../models/transfer.model';
import {SummariesService} from './summaries.service';

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
    || transaction.subCategory.toLowerCase().includes(term)
    || transaction.account.toLowerCase().includes(term);
}

@Injectable()
export class TransactionsService {

  baseUrl = environment.baseUrl;
  transactionAdded = new Subject<any>();
  transactionChanged = new Subject<Transaction>();
  transferChanged = new Subject<Transfer>();

  // for filtering
  transactionsList: TransactionView[] = [];
  // from all Transactions request
  transactionsListImmutable: TransactionView[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _transactions$ = new BehaviorSubject<TransactionView[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 50,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  // Summary Service

  accGroupsChanged = new Subject<GroupAccount[]>();
  categoryGroupsChanged = new Subject<Group[]>();

  constructor(private httpClient: HttpClient, private summariesService: SummariesService) {
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
        this.transactionsListImmutable = trans;
        this.transactionsList = this.transactionsListImmutable;
        this._search$.next();
      });
  }

  getTransaction(transactionId: number) {
    const url = `${this.baseUrl}/transactions/${transactionId}`;
    this.httpClient.get<Transaction>(url).subscribe(trans => {
      this.transactionChanged.next(trans);
    });
  }

  createTransaction(transaction: Transaction) {
    const url = `${this.baseUrl}/transactions`;
    this.httpClient.post<Transaction>(url, transaction)
      .subscribe(trans => {
      this.updateAllRegardTransaction(trans);
    });
  }

  editTransaction(transaction: Transaction) {
    const url = `${this.baseUrl}/transactions`;
    this.httpClient.put<Transaction>(url, transaction)
      .subscribe(trans => {
        this.updateAllRegardTransaction(trans);
      });
  }

  private updateAllRegardTransaction(trans: Transaction) {
    if (trans) {
      this.transactionAdded.next(trans);
    }
    this.getAllTransactions(new Date());
    this.summariesService.getBrief();
    this.getSummaryByAccounts();
    this.getSummaryByCategories(new Date(), trans.type);
  }

  getTransfer(transferId: number) {
    const url = `${this.baseUrl}/transfers/${transferId}`;
    this.httpClient.get<Transfer>(url).subscribe(transf => {
      this.transferChanged.next(transf);
    });
  }

  createTransfer(transfer: Transfer) {
    const url = `${this.baseUrl}/transfers`;
    this.httpClient.post(url, transfer)
      .subscribe(result => {
        this.transactionAdded.next(result);
        this.getAllTransactions(new Date());
        this.summariesService.getBrief();
        this.getSummaryByAccounts();
      });
  }

  editTransfer(transfer: Transfer) {
    const url = `${this.baseUrl}/transfers`;
    this.httpClient.put<Transfer>(url, transfer).subscribe(transf => {
      this.updateAllRegardTransaction(null);
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

  // Summary Service

  getSummaryByAccounts() {
    const budgetId = 1;
    const url = `${this.baseUrl}/summaries/accounts`;
    const params = new HttpParams().set('budgetId', budgetId.toString());
    this.httpClient.get(url, {params}).subscribe((groups: GroupAccount[]) => {
      this.accGroupsChanged.next(groups);
    });
  }

  getSummaryByCategories(date: Date, type: string) {
    const url = `${this.baseUrl}/summaries/categories`;
    const params = new HttpParams().set('date', date.toString()).set('type', type);
    this.httpClient.get<Group[]>(url, { params })
      .subscribe(groups => {
        this.categoryGroupsChanged.next(groups);
      });
  }

  filterTransactionsViewByAccountType(accountType: string) {
    const result: TransactionView[] = this.transactionsListImmutable.filter(transaction => {
      return transaction.accountType === accountType;
    });
    this.transactionsList = result;
    this._search$.next();
  }

  filterTransactionsViewByAccount(accountName: string) {
    const result: TransactionView[] = this.transactionsListImmutable.filter(transaction => {
      return transaction.account === accountName;
    });
    this.transactionsList = result;
    this._search$.next();
  }

  filterTransactionsViewByCategory(category: string, type: string) {
    const result: TransactionView[] = this.transactionsListImmutable.filter(transaction => {
      return (transaction.category === category && transaction.type === type);
    });
    this.transactionsList = result;
    this._search$.next();
  }

  filterTransactionsViewBySubcategory(category: string, type: string) {
    const result: TransactionView[] = this.transactionsListImmutable.filter(transaction => {
      return (transaction.subCategory === category && transaction.type === type);
    });
    this.transactionsList = result;
    this._search$.next();
  }
}
