import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-lanu-month-paginator',
  templateUrl: './lanu-month-paginator.component.html',
  styleUrls: ['./lanu-month-paginator.component.css']
})
export class LanuMonthPaginatorComponent implements OnInit {

  viewDate = '';
  myDate: Date;
  currentMonth: number;
  isCurrentMonth = true;
  @Output() monthChange = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
    this.myDate = new Date();
    // every month has a 15 date
    this.myDate.setDate(15);
    this.currentMonth = this.myDate.getMonth();
    this.viewDate = this.myDate
      .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  }

  onMonthChange(direction: string) {

    if (direction === 'back') {
      this.myDate.setMonth(this.myDate.getMonth() - 1);
    } else if (direction === 'forward') {
      this.myDate.setMonth(this.myDate.getMonth() + 1);
    }

    this.viewDate = this.myDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short'});
    this.monthChange.emit(this.myDate);

    if (this.currentMonth === this.myDate.getMonth()) {
      this.isCurrentMonth = true;
    } else { this.isCurrentMonth = false; }

  }

}
