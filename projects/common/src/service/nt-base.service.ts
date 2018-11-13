import {throwError as observableThrowError, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {NtPagingModel} from '../model/nt-paging.model';
import {NtSortColumnsModel} from '../model/nt-sort-columns.model';

export abstract class NtBaseService {

    public baseUrl = '';
    public url: string;
    public embeddedStr = '';

    constructor(public entity: string, public http: HttpClient) {
        this.url = this.baseUrl + entity;
    }

    getUrl() {
        return this.url;
    }

    getSearchUrl(searchCondition: string, paging: NtPagingModel, sortOprions: NtSortColumnsModel) {
        if (!searchCondition) {
            searchCondition = '';
        }
        let sortStr = sortOprions.getSortString();
        if (!sortStr) {
            sortStr = '';
        }
        return this.embeddedStr + searchCondition + sortStr;
    }

    getDownloadTemplateUrl() {
        // http://localhost:9999/v1/excel/template?rule=payer
        return this.baseUrl + 'excel/template?rule=' + this.entity;
    }

    getExcelDownloadTemplateUrl() {
        // http://localhost:9999/v1/excel/template?rule=payer
        return this.baseUrl + 'excel/template?rule=' + this.entity;
    }

    getCsvDownloadTemplateUrl() {
        // http://localhost:9999/v1/csv/template?rule=payer
        return this.baseUrl + 'csv/template?rule=' + this.entity;
    }

    getExcelUploadUrl() {
        // 'https://-----/v1/excel?rule=entity';
        return this.baseUrl + 'excel?rule=' + this.entity;
    }

    getCsvUploadUrl() {
        // 'https://-----/v1/Csv?rule=entity';
        return this.baseUrl + 'csv?rule=' + this.entity;
    }

    getEnumList(e: string) {
        // e = e.replace('Enum', '');
        return this.http.get(`${this.baseUrl}enum/${e}`).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

    head(id: any, field: string, value: string) {
        field = field ? field : '';
        value = value ? value : '';
        const str = id ? (field + '/' + value + '?id=' + id) : field + '/' + value;
        return this.http.head(`${this.url}/${str}`).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

    // public setUrl(entity: string) {
    //     this.url = this.baseUrl + entity;
    // }
    getAll(searchStr ?: string) {
        searchStr = searchStr ? searchStr : '';
        let tempPaging = new NtPagingModel({pageNumber: 1, pageSize: 1000000});
        let idSortStr = 'sort=id,desc&';
        let finalStr = `${this.url}?${tempPaging.getPagingStr()}${searchStr}${this.embeddedStr}`;
        return this.http.get(finalStr).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

    getAllWithoutEmbeded() {
        let tempPaging = new NtPagingModel({pageNumber: 1, pageSize: 1000000});
        let idSortStr = 'sort=id,desc&';
        return this.http.get(`${this.url}?${tempPaging.getPagingStr()}`).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

    get(id) {
        return this.http.get(`${this.url}/${id}?${this.embeddedStr}`).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

    getAllByPaging(searchCondition: string, paging: NtPagingModel, sortOprions: NtSortColumnsModel) {
        if (!searchCondition) {
            searchCondition = '';
        }
        let sortStr = sortOprions.getSortString();
        if (!sortStr) {
            sortStr = '';
        }
        return this.http.get(`${this.url}?${paging.getPagingStr()}${this.embeddedStr + searchCondition + sortStr}`).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

    add(value: any) {
        return this.http.post(`${this.url}`, value).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

    update(id: number | string, value: any) {
        return this.http.put(`${this.url}/${id}`, value).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

    patch(id: number, value: any) {
        return this.http.patch(`${this.url}/${id}`, value).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`).pipe(
            map((response) => response), catchError(res => observableThrowError(res)),);
    }

}
