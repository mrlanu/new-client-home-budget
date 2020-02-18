import { Component, OnInit } from '@angular/core';
import {UiService} from '../../../services/ui.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  constructor(private uiService: UiService) { }

  ngOnInit() {

  }

  onClose() {
    this.uiService.isSummaryTransactionsChange.next(false);
  }

}
