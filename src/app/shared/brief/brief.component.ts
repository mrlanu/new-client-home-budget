import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Brief} from '../../models/brief';
import {SummariesService} from '../../services/summaries.service';
@Component({
  selector: 'app-brief',
  templateUrl: './brief.component.html',
  styleUrls: ['./brief.component.css']
})
export class BriefComponent implements OnInit, OnDestroy {

  brief: Brief;
  componentSubs: Subscription[] = [];

  constructor(private summaryService: SummariesService) { }

  ngOnInit() {
    this.componentSubs.push(
      this.summaryService.briefChanged
      .subscribe((brief: Brief) => {
        this.brief = brief;
      }));
    this.summaryService.getBrief();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
