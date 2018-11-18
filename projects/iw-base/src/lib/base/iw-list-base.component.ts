import {debounceTime} from 'rxjs/operators';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {Sorts} from '../app/models/sorts.model';
import {Paging} from '../app/models/paging.model';
import {IwHelperService} from '../services/iw-helper.service';
import {PermissionConstants} from '../app/constants/permission.constant';
import {environment} from '../environments/environment';
import {Sort} from '../app/models/sort.model';

export class IwListBaseComponent {
  public sortOprions: Sorts = new Sorts();
  public permission: any;
  public paging: Paging;
  public selectedList: any[] = [];
  public listElements: any[] = [];
  public selectedIds: string;
  public isSelectAll: boolean;
  public baseUrl: string;

  public currentRouterUrl;

  public searchForm: FormGroup;
  public searchCondition: string;
  public loading: boolean;

  public token: string;

  public diffSearchStr = '';


  columns: any;
  columnKey: any;
  columnValue: any;
  columnName: any;
  columnVisibility = {};
  queryParams: any;
  listName = '';
  menuName = '';
  columnsInQuery = [];
  searchFormDisability = {};

  listDetailRouterParams = {};

  constructor(public router: Router,
              public helperService: IwHelperService) {
    this.permission = PermissionConstants.constants;
    this.paging = new Paging({pageNumber: 1, pageSize: 12});
    this.baseUrl = environment.apiUrl;
    // this.columns = MemberDataGrid.values['defaultColumn'].columns;
  }

  generateDiffSearchStr(params) {
    this.diffSearchStr = this.helperService.generateDiffSearchStr(params);
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


  // url functions

  resetCurrentRouterUrl() {
    this.currentRouterUrl = '';
    if (this.router.url.indexOf('?') > -1) {
      this.currentRouterUrl = this.router.url.substring(0, this.router.url.indexOf('?'));
    } else {
      this.currentRouterUrl = this.router.url;
    }
  }


  //form

  debounceSearchForm() {
    this.searchCondition = '';
    this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe((form: any) => {

      this.resetCurrentRouterUrl();
      const urlTree = this.router.parseUrl(this.currentRouterUrl);
      urlTree.queryParams = this.helperService.generateQueryParams(urlTree.queryParams, form);

      this.router.navigateByUrl(urlTree).then(resp => {
        this.refresh();
      });

    });
  }

  patchFormValueFromRouter() {
    if ((this.router.url.indexOf('?') > -1)) {
      this.searchForm.patchValue(this.router.parseUrl(this.router.url).queryParams);
    }
  }

  // reset Form
  reset() {
    this.resetCurrentRouterUrl();
    this.router.navigateByUrl(this.currentRouterUrl).then(resp => {
      this.searchForm.reset();
    });
  }


  // columns related functions

  // getColumns(params) {
  //     this.columnValue = params['columnValue'];
  //     if (this.columnValue) {
  //         this.columns = MemberDataGrid.values[this.columnValue].columns;
  //     }
  // }
  //
  // getColumnKeyAndValue(params) {
  //     this.columnValue = params['columnValue'];
  //     this.columnKey = params['columnKey'];
  //     if (this.columnValue) {
  //         this.columns = MemberDataGrid.values[this.columnValue].columns;
  //     }
  // }

  getColumnVisibility() {
    this.columns.map(c => {
      this.columnVisibility[c.columnModel] = c.hiddenInList;
    });
  }

  getColumnsInQuery(params) {
    this.columnsInQuery = [];
    for (const key in params) {
      if (params.hasOwnProperty(key) && key.startsWith('f_') && !key.endsWith('_op')) {
        this.columnsInQuery.push({
          columnKey: key.replace('f_', ''),
          columnValueCamelCase: _.camelCase(params[key]),
          columnValue: params[key]
        });

        const ck = key.replace('f_', '');
        const cv = _.camelCase(params[key]);

        this.columns.map(c => {
          if (c.columnModel === ck) {
            c.hiddenInForm = true;
          }
          this.columnVisibility[c.columnModel] = c.hiddenInList;
          this.searchFormDisability[c.columnModel] = c.hiddenInForm;
        });
      }
    }
    console.log(this.columnsInQuery);
    console.log(this.columns);
  }


  // 设置列表名称
  setListName(params) {
    this.menuName = params['menuName'];
    if (this.menuName) {
      this.listName = _.startCase(this.menuName) + ' List';
    }
  }


  // 列表跳编辑

  edit(url, detailObject) {
    this.listDetailRouterParams = Object.assign({}, this.queryParams, detailObject);
    this.router.navigate([url], {queryParams: this.listDetailRouterParams});

  }

}
