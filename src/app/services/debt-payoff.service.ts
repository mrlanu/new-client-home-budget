import {Injectable} from '@angular/core';
import {DebtModel} from '../models/debt.model';
import {Subject} from 'rxjs';

@Injectable()
export class DebtPayoffService {

  debtsListChanged = new Subject<DebtModel[]>();
  debtCreated = new Subject<void>();

  private debtsList: DebtModel[] =
    [{publicId: 'test1', name: 'City VISA', apr: 12, currentBalance: 1870, minimumPayment: 100, nextPaymentDue: new Date(),
      paymentsList: [], startBalance: 2000},
      // tslint:disable-next-line:max-line-length
      {publicId: 'test2', name: 'BofA MASTER CARD TEST TEST', apr: 12, currentBalance: 1000, minimumPayment: 100, nextPaymentDue: new Date(),
        paymentsList: [{amount: 20, date: new Date()}], startBalance: 2000}];

  constructor() {}

  createDebt(debt: DebtModel) {
    this.debtsList.push(debt);
    this.debtsListChanged.next(this.debtsList);
    this.debtCreated.next();
  }

  getDebtsList() {
    this.debtsListChanged.next(this.debtsList);
  }
}
