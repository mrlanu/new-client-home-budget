import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TransactionsService} from '../../../services/transactions.service';
import {TransactionView} from '../../../models/transaction-view.model';
import {Observable, Subscription} from 'rxjs';
import {SortableDirective, SortEvent} from './sortable.directive';
import {UtilityService} from '../../../services/utility.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];

  transactionsList$: Observable<TransactionView[]>;
  total$: Observable<number>;
  sterti: TransactionView;

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(public transactionsService: TransactionsService, private utilityService: UtilityService) {
    this.transactionsList$ = transactionsService.transactions$;
    this.total$ = transactionsService.total$;
  }

  ngOnInit(): void {
    this.transactionsService.getAllTransactions(new Date());
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
