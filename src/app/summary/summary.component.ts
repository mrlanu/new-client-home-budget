import { Component, OnInit } from '@angular/core';
import {SummariesService} from '../services/summaries.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(private summariesService: SummariesService) { }

  ngOnInit() {
  }

  onTest(ev){
    console.log(ev);
  }

  /*onTabChange(event) {
    if (event === 1) {
      this.summariesService.getSummaryByCategories(new Date(), this.tabs[event]);
    } else if (event === 2) {
      this.summaryService.getSummaryByCategories(new Date(), this.tabs[event]);
    } else {
      this.summaryService.getSummaryByAccount();
    }
  }*/

}
