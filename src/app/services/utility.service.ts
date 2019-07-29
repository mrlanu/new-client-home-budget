import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Category} from '../models/category.model';
import {Subject} from 'rxjs';
import {Subcategory} from '../models/subcategory.model';
import {Account} from '../models/account.model';
import {map} from 'rxjs/operators';
import {SummariesService} from './summaries.service';

@Injectable()
export class UtilityService {

  baseUrl = environment.baseUrl;
  accountsChanged = new Subject<Account[]>();
  accountCreated = new Subject<Account>();
  categoryChanged = new Subject<Category[]>();
  categoryCreated = new Subject<Category>();
  subcategoryChanged = new Subject<Subcategory[]>();
  subcategoryCreated = new Subject<Subcategory>();

  constructor(private httpClient: HttpClient, private summariesService: SummariesService) { }

  getAllAccounts() {
    const url = `${this.baseUrl}/accounts`;
    this.httpClient.get(url).subscribe((accounts: Account[]) => {
      this.accountsChanged.next(accounts);
    });
  }

  createAccount(account: Account) {
    const url = `${this.baseUrl}/accounts`;
    this.httpClient.post<Account>(url, account)
      .subscribe(acc => {
        this.getAllAccounts();
        this.summariesService.getBrief();
        this.accountCreated.next(acc);
      });
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
    this.httpClient.post<Category>(url, category)
      .subscribe(cat => {
        this.getAllCategories();
        this.categoryCreated.next(cat);
      });
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
    this.httpClient.post<Subcategory>(url, subcategory)
      .subscribe(subc => {
        this.getAllSubcategories(categoryId);
        this.subcategoryCreated.next(subc);
      });
  }

  getRandomUser() {
    return this.httpClient.get<any>('https://randomuser.me/api/').pipe(map(o => {
      return {
        name: `${o.results[0].name.first} ${o.results[0].name.last}`,
        image: o.results[0].picture.medium
      };
    }));
  }
}
