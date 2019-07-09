import {Account} from './account.model';
import {Category} from './category.model';
import {Subcategory} from './subcategory.model';

export interface Transaction {
  id: number;
  date: Date;
  type: string;
  description: string;
  amount: number;
  account: Account;
  category: Category;
  subCategory: Subcategory;
}
