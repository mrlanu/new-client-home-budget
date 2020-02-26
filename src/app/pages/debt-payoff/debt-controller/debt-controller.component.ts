import { Component, OnInit } from '@angular/core';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-debt-controller',
  templateUrl: './debt-controller.component.html',
  styleUrls: ['./debt-controller.component.css']
})
export class DebtControllerComponent implements OnInit {

  faTimes = faTimes;
  faPlus = faPlus;
  strategy = [
    {
      'name': 'Avalanche',
      'description': 'APR high to low',
      'value': '0'
    },
    {
      'name': 'Snowball',
      'description': 'Balance low to high',
      'value': '1'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
