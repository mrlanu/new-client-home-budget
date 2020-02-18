import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TransactionsService} from '../../../services/transactions.service';
import {TransactionView} from '../../../models/transaction-view.model';
import {Observable, Subscription} from 'rxjs';
import {SortableDirective, SortEvent} from './sortable.directive';
import {UiService} from '../../../services/ui.service';
import {faCartPlus, faHome, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];

  faTimesCircle = faTimesCircle;
  faCartPlus = faCartPlus;

  transactionsList$: Observable<TransactionView[]>;
  total$: Observable<number>;

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(public transactionsService: TransactionsService, public uiService: UiService) {
    this.transactionsList$ = transactionsService.transactions$;
    this.total$ = transactionsService.total$;
  }

  ngOnInit(): void {
    this.transactionsService.getAllTransactions(new Date());
  }

  onAddTransaction() {
    this.uiService.isSummaryTransactionsChange.next(true);
  }

  onTransactionSelect(trans: TransactionView) {
    if (trans.type === 'TRANSFER') {
      this.transactionsService.getTransfer(trans.id);
    } else {
      this.transactionsService.getTransaction(trans.id);
    }
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.transactionsService.sortColumn = column;
    this.transactionsService.sortDirection = direction;
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
