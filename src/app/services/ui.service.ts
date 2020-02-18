import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class UiService {

  constructor() {}

  isLoadingChanged = new Subject<boolean>();
  isLoginChanged = new Subject<boolean>();
  isShowBudgetSelectChanged = new Subject<boolean>();
  isSummaryTransactionsChange = new Subject<boolean>();
}
