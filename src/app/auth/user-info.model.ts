import {Budget} from '../models/budget.model';

export interface UserInfo {
  userId: number;
  username: string;
  budgets: Budget[];
}
