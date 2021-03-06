import {NtSortColumModel} from './nt-sort-colum.model';

export class NtSortColumnsModel {
    sortColumns: NtSortColumModel[];

    getSortString() {
        let sortString = '&';
        this.sortColumns.map(s => {
            const t = s.isAsc ? 'asc' : 'desc';
            if (s.isSortable && s.isActive) {
                sortString = sortString + 'sort=' + s.columnModel + ',' + t + '&';
            }
        });

        if (sortString.indexOf('&') > -1) {
            sortString = sortString.slice(0, -1);
        }
        return sortString;
    }

    constructor() {
        this.sortColumns = [];
    }
}
