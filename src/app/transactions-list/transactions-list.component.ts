import {Component, OnDestroy, OnInit, PipeTransform} from '@angular/core';
import {TransactionsService} from '../services/transactions.service';
import {TransactionView} from '../models/transaction-view.model';
import {Observable, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {map, startWith, tap} from 'rxjs/operators';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
  providers: [DecimalPipe]
})
export class TransactionsListComponent implements OnInit, OnDestroy {

  page = 1;
  pageSize = 10;
  transactionsList: TransactionView[] = [];
  collectionSize = 0;
  componentSubs: Subscription[] = [];

  transactionsList$: Observable<TransactionView[]>;
  filter = new FormControl('');

  constructor(private transactionsService: TransactionsService, private pipe: DecimalPipe) {

  }

  ngOnInit(): void {
    this.componentSubs.push(this.transactionsService.transactionsListChanged
      .subscribe((transitions: TransactionView[]) => {
        this.transactionsList = transitions;
        this.collectionSize = transitions.length;
        // for restart observable
        // this.filter.patchValue('');
        this.transactionsList$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe))
        );
      }));
    this.transactionsService.getAllTransactions(new Date());
  }

  getTransactions(): TransactionView[] {
    return this.transactionsList
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  search(text: string, pipe: PipeTransform): TransactionView[] {
    return this.transactionsList.filter(trans => {
      const term = text.toLowerCase();
      return trans.category.toLowerCase().includes(term)
        || trans.subCategory.toLowerCase().includes(term)
        || trans.account.toLowerCase().includes(term);
    });
  }
}
