import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Category} from '../models/category.model';
import {Subject} from 'rxjs';
import {Subcategory} from '../models/subcategory.model';
import {Account} from '../models/account.model';

@Injectable()
export class UtilityService {

  baseUrl = environment.baseUrl;
  accountsChanged = new Subject<Account[]>();
  categoryChanged = new Subject<Category[]>();
  subcategoryChanged = new Subject<Subcategory[]>();

  constructor(private httpClient: HttpClient) { }

  getAllAccounts() {
    const url = `${this.baseUrl}/accounts`;
    this.httpClient.get(url).subscribe((accounts: Account[]) => {
      this.accountsChanged.next(accounts);
    });
  }

  createAccount(account: Account) {
    const url = `${this.baseUrl}/accounts`;
    return this.httpClient.post(url, account);
  }

  getAllCategories() {
    const url = `${this.baseUrl}/categories`;
    this.httpClient.get(url)
      .subscribe((categories: Category[]) => {
        this.categoryChanged.next(categories);
      });
  }

  createCategory(category: Category) {
    const url = `${this.baseUrl}/categories`;
    return this.httpClient.post(url, category);
  }

  getAllSubcategories(categoryId: number) {
    const url = `${this.baseUrl}/categories/${categoryId}/subcategories`;
    this.httpClient.get(url)
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategoryChanged.next(subcategories);
      });
  }

  createSubcategory(categoryId: number, subcategory: Subcategory) {
    const url = `${this.baseUrl}/categories/${categoryId}/subcategories`;
    return this.httpClient.post(url, subcategory);
  }
}
