export class Paging {
    pageNumber: number;
    pageSize: number;
    totalSize: number;

     constructor(params: { pageNumber: number, pageSize: number }) {
        this.pageNumber = params.pageNumber;
        this.pageSize = params.pageSize;
    }

    getPagingStr() {
        return `page=${this.pageNumber}&size=${this.pageSize}`;
    }
}
