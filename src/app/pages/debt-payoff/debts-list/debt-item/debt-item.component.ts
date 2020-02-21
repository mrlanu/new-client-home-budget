import {Component, Input, OnInit} from '@angular/core';
import {DebtModel} from '../../../../models/debt.model';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-debt-item',
  templateUrl: './debt-item.component.html',
  styleUrls: ['./debt-item.component.css']
})
export class DebtItemComponent implements OnInit {

  @Input() debtItem: DebtModel;
  progress = 0;
  faEdit = faEdit;
  faTimes = faTimes;

  constructor() { }

  ngOnInit() {
    this.progress = (this.debtItem.startBalance - this.debtItem.currentBalance) * 100 / this.debtItem.startBalance;
  }

}
