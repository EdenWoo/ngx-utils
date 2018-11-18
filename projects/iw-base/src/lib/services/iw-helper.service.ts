import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class IwHelperService {

  constructor() {
  }

  parseToFix(input: number, num: number) {
    if (input) {
      return parseFloat(parseFloat((Math.round(input * 10000) / 10000).toString()).toFixed(num));
    }
  }

  generateQueryString(o: any) {
    let str = '';
    if (o) {
      Object.keys(o).forEach(key => {
        // console.log(key);
        if (o[key] !== null && o[key] !== '' && o[key] !== undefined) {
          str = str + '&f_' + key + '=' + o[key];
        }
      });
    }

    return str;
  }

  copyProperty(objFrom: any, objTo: any) {
    if (objFrom && objTo) {
      // Object.keys()
    }
  }


  getSearchConditionByRouter(router: Router) {

    const urlTree = router.parseUrl(router.url);

    const searchConditionForQuery = this.generateQueryString(urlTree.queryParams);

    // console.log(searchConditionForQuery);

    return searchConditionForQuery;
  }

  generateQueryParams(queryParams: { [p: string]: string }, o: any) {
    if (o) {
      Object.keys(o).forEach(key => {
        // console.log(key);
        if (o[key] !== null && o[key] !== '' && o[key] !== undefined) {
          // str = str +  '&f_' + key + '=' +  o[key]
          queryParams[key] = o[key];
        }
      });
    }
    return queryParams;
  }

  public populateObject<T>(params: URLSearchParams, prefix: string, val: T) {
    const objectKeys = Object.keys(val) as Array<keyof T>;

    if (prefix) {
      prefix = prefix + '.';
    }

    for (let objKey of objectKeys) {

      let value = val[objKey];
      let key = prefix + objKey;

      // this.PopulateSearchParams(params, key, value);
    }
  }

  removePros(value: any) {
    if (value.createdAt) {
      delete value.createdAt;
    }

    if (value.updatedAt) {
      delete value.updatedAt;
    }

    if (value.creator) {
      delete value.creator;
    }

    if (value.modifier) {
      delete value.modifier;
    }
    return value;
  }

  /**
   * input '2018-01-01'
   * */
  dateTosecond(date) {
    const d = new Date(date);
    const second = d.getTime();
    return second / 1000;
  }

  generateDiffSearchStr(params) {
    let diffSearchStr = '';
    console.log(params);
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key) && key.indexOf('f_') > -1) {
          diffSearchStr += '&' + key + '=' + params[key];
        }
      }
    }
    return diffSearchStr;
  }
}
