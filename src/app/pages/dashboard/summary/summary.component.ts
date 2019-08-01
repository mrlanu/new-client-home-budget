import { Component, OnInit } from '@angular/core';
import {SummariesService} from '../../../services/summaries.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private summariesService: SummariesService) { }

  ngOnInit() {
  }
}
