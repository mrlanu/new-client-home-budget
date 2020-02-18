import { Component, OnInit } from '@angular/core';
import {UiService} from '../../../services/ui.service';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  faTimesCircle = faTimesCircle;
  constructor(private uiService: UiService) { }

  ngOnInit() {

  }

  onClose() {
    this.uiService.isSummaryTransactionsChange.next(false);
  }

}
