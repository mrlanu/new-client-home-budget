import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Category} from '../models/category.model';
import {Subject} from 'rxjs';
import {Subcategory} from '../models/subcategory.model';
import {Account} from '../models/account.model';
import {SummariesService} from './summaries.service';
import {Budget} from '../models/budget.model';
import {DataViewModel} from '../models/data-view.model';

@Injectable()
export class UtilityService {

  baseUrl = environment.baseUrl;
  accountsChanged = new Subject<Account[]>();
  accountCreated = new Subject<Account>();
  categoriesChanged = new Subject<Category[]>();
  categoryCreated = new Subject<Category>();
  subcategoryChanged = new Subject<Subcategory[]>();
  subcategoryCreated = new Subject<Subcategory>();
  dataChanged = new Subject<DataViewModel>();
  budgetsChange = new Subject<Budget[]>();
  budgets: Budget[] = [];


  private _accounts: Account[] = [];
  private _categories: Category[] = [];
  private _subcategories: Subcategory[] = [];

  constructor(private httpClient: HttpClient,
              private summariesService: SummariesService) { }

  getDataView() {
    const url = `${this.baseUrl}/test`;
    const params = new HttpParams()
      .set('startDate', '2015-01-01')
      .set('endDate', '2020-01-01')
      .set('amount', '1000')
      .set('percentDropdown', '3');
    this.httpClient.get<DataViewModel>(url, {params: params}).subscribe(d => {
      this.dataChanged.next(d);
    });
  }

  getBudgetsByUser() {
    const url = `${this.baseUrl}/budgets`;
    this.httpClient.get<Budget[]>(url).subscribe(budgets => {
      this.budgets = budgets;
      this.budgetsChange.next(budgets);
    });
  }

  getAllAccounts() {
    const url = `${this.baseUrl}/accounts`;
    this.httpClient.get(url).subscribe((accounts: Account[]) => {
      this._accounts = accounts;
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
        this._categories = categories;
        this.categoriesChanged.next(categories);
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
        this._subcategories = subcategories;
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

  /*getRandomUser() {
    return this.httpClient.get<any>('https://randomuser.me/api/').pipe(map(o => {
      return {
        name: `${o.results[0].name.first} ${o.results[0].name.last}`,
        image: o.results[0].picture.medium
      };
    }));
  }*/

  get accounts(): Account[] {
    return [...this._accounts];
  }

  get categories(): Category[] {
    return [...this._categories];
  }

  get subcategories(): Subcategory[] {
    return [...this._subcategories];
  }
}
