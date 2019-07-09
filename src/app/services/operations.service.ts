import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Category} from '../models/category.model';
import {Subject} from 'rxjs';
import {Subcategory} from '../models/subcategory.model';
import {Account} from '../models/account.model';
import {Transaction} from '../models/transaction.model';

@Injectable()
export class OperationsService {

  baseUrl = environment.baseUrl;
  accountsChanged = new Subject<Account[]>();
  categoryChanged = new Subject<Category[]>();
  subcategoryChanged = new Subject<Subcategory[]>();

  constructor(private httpClient: HttpClient) { }

  createTransaction(transaction: Transaction) {
    const url = `${this.baseUrl}/transactions`;
    return this.httpClient.post(url, transaction);
  }

  getAllAccounts() {
    const url = `${this.baseUrl}/accounts`;
    this.httpClient.get(url).subscribe((accounts: Account[]) => {
      this.accountsChanged.next(accounts);
    });
  }


  getAllCategories() {
    const url = `${this.baseUrl}/categories`;
    this.httpClient.get(url)
      .subscribe((categories: Category[]) => {
        this.categoryChanged.next(categories);
      });
  }

  getAllSubcategories(categoryId: number) {
    const url = `${this.baseUrl}/categories/${categoryId}/subcategories`;
    this.httpClient.get(url)
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategoryChanged.next(subcategories);
      });
  }
}
