export interface Transfer {
  id: number;
  fromAccount: Account;
  toAccount: Account;
  amount: number;
  date: Date;
}
