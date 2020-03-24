import { Component, OnInit } from '@angular/core';
import {UtilityService} from '../services/utility.service';

declare var menu: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private utilityService: UtilityService) { }

  ngOnInit() {
    this.utilityService.dataChanged.subscribe(d => {
      console.log(d);
      menu(d);
    });
    this.utilityService.getDataView();

    /*const data = {
      'x': ['2017-01-04', '2017-01-05', '2017-01-06', '2017-01-09', '2017-01-10', '2017-01-11'],
      'close': [116.019997, 116.610001, 117.910004, 118.989998, 119.110001, 119.75],
      'high': [116.510002, 116.860001, 118.160004, 119.43, 119.379997, 119.93],
      'low': [115.75, 115.809998, 116.470001, 117.940002, 118.300003, 118.599998],
      'open': [115.849998, 115.919998, 116.779999, 117.949997, 118.769997, 118.739998]
    };
    const data2 = {
      'x': ['2017-01-04', '2017-01-05', '2017-01-06', '2017-01-09', '2017-01-10', '2017-01-11'],
      'close': [116.019997, 116.610001, 113.910004, 118.989998, 119.110001, 119.75],
      'high': [116.510002, 116.860001, 118.160004, 119.43, 119.379997, 119.93],
      'low': [115.75, 115.809998, 110.470001, 117.940002, 118.300003, 118.599998],
      'open': [115.849998, 115.919998, 116.779999, 117.949997, 118.769997, 118.739998]
    };
    menu(data2);
    setTimeout(() => {
      menu(data);
    }, 2000);*/
  }

}
