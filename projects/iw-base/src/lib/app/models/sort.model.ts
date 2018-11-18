export class Sort {
    columnDisplay: string;
    columnModel: string;
    isAsc: boolean;
    isActive: boolean;
    isSortable: boolean;
    display: boolean;

    constructor(param: { isAsc: boolean; columnDisplay: string; columnModel: string; isSortable: boolean; isActive: boolean; display: boolean }) {
        this.isAsc = param.isAsc;
        this.columnDisplay = param.columnDisplay;
        this.columnModel = param.columnModel;
        this.isSortable = param.isSortable;
        this.isActive = param.isActive;
        this.display = param.display;
    }
}