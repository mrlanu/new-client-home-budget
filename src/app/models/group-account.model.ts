import {Account} from './account.model';

export interface GroupAccount {
    name: string;
    accountList: Account[];
    balance: number;
}
