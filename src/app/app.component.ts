import {Component} from '@angular/core';
import {CommonUtil} from '../../projects/common/src/lib/common';

@Component({
  selector: 'nu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nu';
  items: any;

  constructor() {
    console.log(CommonUtil.getExplore());
    console.log(CommonUtil.capitalized('eREREfjdjf dERERfj'));
    console.log(CommonUtil.roundDecimal('12321.343', 5));
    this.items = [
      {
        id: 1,
        name: '222',
        label: '222'
      },
      {
        id: 1,
        name: '4343',
        label: '222'
      },
      {
        id: 1,
        name: '234234',
        label: '222'
      }
    ];
  }
}
