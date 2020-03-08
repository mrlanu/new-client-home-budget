import {Component, Input, OnInit} from '@angular/core';
import {DebtStrategyReportModel} from '../../../../models/debt-strategy-report.model';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {

  @Input() reportItem: DebtStrategyReportModel;

  constructor() { }

  ngOnInit() {
  }

}
