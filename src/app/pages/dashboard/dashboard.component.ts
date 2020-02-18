import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UiService} from '../../services/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  viewChange = false;

  componentSubs: Subscription[] = [];

  constructor(public uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.uiService.isSummaryTransactionsChange
      .subscribe((res: boolean) => {
        this.viewChange = res;
      }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
