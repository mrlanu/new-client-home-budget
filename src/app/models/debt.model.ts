export interface DebtModel {
  publicId: string;
  name: string;
  startBalance: number;
  currentBalance: number;
  apr: number;
  minimumPayment: number;
  nextPaymentDue: Date;
  paymentsList: PaymentModel[];
}

export interface PaymentModel {
  amount: number;
  date: Date;
}
