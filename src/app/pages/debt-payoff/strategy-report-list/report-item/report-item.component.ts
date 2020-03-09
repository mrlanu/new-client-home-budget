import {Component, Input, OnInit} from '@angular/core';
import {DebtStrategyReportModel} from '../../../../models/debt-strategy-report.model';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {

  @Input() reportItem: DebtStrategyReportModel;
  faTrophy = faTrophy;

  constructor() { }

  ngOnInit() {
  }

}
