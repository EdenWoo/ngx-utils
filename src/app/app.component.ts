import {Component} from '@angular/core';
import {CommonUtil} from '../../projects/common/src/lib/common';

@Component({
  selector: 'nu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nu';

  constructor() {
    console.log(CommonUtil.getExplore());
    console.log(CommonUtil.capitalized('eREREfjdjf dERERfj'));
    console.log(CommonUtil.roundDecimal('12321.343', 5));
  }
}
