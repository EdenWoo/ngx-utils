export class NtSortColumModel {
    columnDisplay: string;
    columnModel: string;
    isAsc: boolean;
    isActive: boolean;
    isSortable: boolean;

    constructor(param: { isAsc: boolean; columnDisplay: string; columnModel: string; isSortable: boolean; isActive: boolean }) {
        this.isAsc = param.isAsc;
        this.columnDisplay = param.columnDisplay;
        this.columnModel = param.columnModel;
        this.isSortable = param.isSortable;
        this.isSortable = param.isSortable;
        this.isActive = param.isActive;
    }
}
