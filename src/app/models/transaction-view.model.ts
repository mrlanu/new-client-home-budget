export interface TransactionView {
  id: number;
  date: Date;
  type: string;
  description: string;
  amount: number;
  category: string;
  subCategory: string;
  account: string;
  accountType: string;
}
