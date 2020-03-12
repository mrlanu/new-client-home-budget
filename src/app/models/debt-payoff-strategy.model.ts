import {DebtStrategyReportModel} from './debt-strategy-report.model';

export interface DebtPayoffStrategyModel {
  totalDuration: number;
  totalInterest: number;
  debtFreeDate: Date;
  reports: DebtStrategyReportModel[];
}
