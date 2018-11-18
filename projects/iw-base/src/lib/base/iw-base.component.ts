import {Sorts} from '../app/models/sorts.model';
import {PermissionConstant} from '../app/models/permission-constant.model';
import {Paging} from '../app/models/paging.model';
import {PermissionConstants} from '../app/constants/permission.constant';
import {environment} from '../environments/environment';
import {Sort} from '../app/models/sort.model';


export class BaseComponent {
  public sortOprions: Sorts = new Sorts();
  public permission: PermissionConstant;
  public paging: Paging;
  public selectedList: any[] = [];
  public listElements: any[] = [];
  public selectedIds: string;
  public isSelectAll: boolean;
  public baseUrl: string;

  constructor() {
    this.permission = PermissionConstants.constants;
    this.paging = new Paging({pageNumber: 1, pageSize: 12});
    this.baseUrl = environment.apiUrl;
  }

  /**
   * ----- paging -----
   */
  pageChanged(event) {
    console.log(event);
    this.paging.pageNumber = event;
    this.refresh();
  }

  onPageSizeChange(event) {
    this.paging.pageNumber = 1;
    this.paging.pageSize = event;
    this.refresh();
  }

  public refresh() {

  };

  /**
   * ----- Sort  -----
   */
  changeSort(c: Sort) {
    console.log('change sort');
    if (c.isSortable) {
      this.sortOprions.sortColumns.map(s => {
        s.isActive = false;
      });
      c.isActive = true;
      c.isAsc = !c.isAsc;
      this.refresh();
    }
  }

  getSortClass(c: Sort) {
    if (c.isSortable && c.isActive) {
      return c.isAsc ? 'sorting_desc' : 'sorting_asc';
    } else if (c.isSortable && !c.isActive) {
      return 'sorting';
    } else {
      return '';
    }
  }

  /**
   *  ----------- select table items ----------
   * */

  select(p: any) {
    console.log('===================');
    console.log('select in base comp');
    this.selectedList = this.listElements.filter(d => d.isSelected === true);
    this.selectedIds = this.selectedList.map(e => e.id).join(',');
    console.log(this.selectedList);
    console.log(this.selectedIds);
    this.checkIfSelectAll();
  }

  selectAll() {

    if (this.isSelectAll) {
      this.listElements.map(d => {
        d.isSelected = true;
      });
      this.selectedList = JSON.parse(JSON.stringify(this.listElements));
      this.selectedIds = this.selectedList.map(e => e.id).join(',');
    } else {
      this.selectedList = [];
      this.listElements.map(d => {
        d.isSelected = false;
      });
      this.selectedIds = '';
    }
  }

  deSelectAll() {
    this.selectedList = [];
    this.listElements.map(d => {
      d.isSelected = false;
    });
    this.isSelectAll = false;
  }

  checkIfSelectAll() {
    if (!(this.selectedList.length === this.listElements.length)) {
      this.isSelectAll = false;
    } else {
      this.isSelectAll = true;
    }
  }

}
