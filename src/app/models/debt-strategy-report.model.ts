import {DebtReportItemModel} from './debt-report-item.model';

export interface DebtStrategyReportModel {
  duration: number;
  extraPayments: DebtReportItemModel[];
  minPayments: DebtReportItemModel[];
}
