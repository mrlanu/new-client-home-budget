import {Subcategory} from './subcategory.model';

export interface Category {
  id: number;
  name: string;
  type: string;
  subCategoryList: Subcategory[];
}
