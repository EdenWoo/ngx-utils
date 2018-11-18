import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import {IwAuthenticationService} from '../services/iw-authentication.service';
import {PermissionConstants} from '../app/constants/permission.constant';
import {Constants} from '../app/constants/app.constant';

export class IwFormBaseComponent {
  public permission: any;
  public loading: boolean;
  public myForm: FormGroup;
  public id: number;
  public isEdit = false;
  public subscription: Subscription;
  diffSearchStr: string;
  menuName = '';
  formName = '';
  queryParams: any;

  // public numberMask = createNumberMask({
  //     prefix: '',
  //     allowDecimal: true,
  //     decimalLimit: 2,
  //     decimalSymbol: '.'
  // });
  //
  // public allowNegativeNumberMask = createNumberMask({
  //     prefix: '',
  //     allowDecimal: true,
  //     decimalLimit: 2,
  //     decimalSymbol: '.',
  //     allowNegative: true
  // });
  //
  // public noNegativeNumberMask = createNumberMask({
  //     prefix: '',
  //     allowDecimal: true,
  //     decimalLimit: 2,
  //     decimalSymbol: '.',
  //     allowNegative: false
  // });

  columns: any;
  columnName: any;
  columnValue: any;
  columnKey: any;
  rows = [];
  columnsInQuery = [];
  columnVisibility = {};
  token: any;
  apiEndPoint: any;
  uploadUrl: any;

  constructor(public activatedRoute: ActivatedRoute,
              public authService: IwAuthenticationService,
              public httpClient: HttpClient,
              public location: Location) {
    this.permission = PermissionConstants.constants;
    this.token = authService.getToken();
    this.apiEndPoint = Constants.API_ENDPOINT;
    this.uploadUrl = Constants.API_ENDPOINT + 'v1/attachment/upload?token=' + this.token;
  }

  getRouteParemeter() {
    this.subscription = this.activatedRoute
      .params
      .subscribe(params => {
        console.log(params);
        this.id = params['id'];
        if (this.id && this.id > 0) {
          this.isEdit = true;
          this.getItem();
        } else {
          this.isEdit = false;
        }
        this.initFormControl();
      });
  }

  equals(r1: any, r2: any) {
    if (r1 && r2) {
      return r1.pk === r2.pk;
    }
  }

  initFormControl() {
  }

  goBack() {
    this.location.back();
  }

  public getItem() {
  }

  getQueryParams(IdProp: string) {
    this.subscription = this.activatedRoute
      .queryParams
      .subscribe(params => {
      });
  }

  // 地址中的请求参数处理
  queryParamsLogics(dataGrid) {
    this.setFormName(); // 设置表单名字
    this.getColumns(dataGrid);
    this.getColumnsInQuery();
    this.rows = Array.from(
      Array(Math.ceil(this.columns.length / 2)).keys()
    );
  }


  // 设置表单名称
  setFormName() {
    this.menuName = this.queryParams['menuName'];
    if (this.menuName) {
      this.formName = _.startCase(this.menuName) + ' Form';
    }
  }

  getColumns(dataGrid) {
    this.columnValue = this.queryParams['columnValue'];
    if (this.columnValue) {
      this.columns = dataGrid.values[this.columnValue].columns;
    }
  }

  getColumnsInQuery() {
    const params = this.queryParams;
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
          this.columnVisibility[c.columnModel] = c.hiddenInForm;
        });
      }
    }
    console.log(this.columnsInQuery);
    console.log(this.columns);
  }

  patchForm() {

  }

  getColumnKeyAndValue(params, dataGrid) {
    this.columnValue = params['columnValue'];
    this.columnKey = params['columnKey'];
    if (this.columnValue) {
      this.columns = dataGrid.values[this.columnValue].columns;
    }
  }

  getColumnVisibility() {
    this.columns.map(c => {

    });
  }


}
