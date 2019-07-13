import {GroupSubcategories} from './group-subcategories.model';

export interface Group {
  id: number;
  name: string;
  groupSubcategoryList: GroupSubcategories[];
  spent: number;
}
