import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Component({
    selector: 'iw-ng-select',
    templateUrl: './iw-ng-select.component.html'
})
export class IwNgSelectComponent implements OnInit {
    @Input('searchStr')
    public searchStr: string;

    @Input('service')
    public service: any;

    @Input('displayProp')
    public displayProp: any;

    @Input('multiple')
    public multiple = false;

    @Input('outputArray')
    public outputArray: boolean;

    @Input('datesForLoad')
    public datasForLoad: any;

    @Input('datasForLoadSubject')
    public datasForLoadSubject = new Subject();

    @Input('dataIdForLoad')
    public dataIdForLoad: number;

    @Input('dataIdForLoadSubject')
    public dataIdForLoadSubject: Subject<number>;

    @Input('datasForSelect')
    public datasForSelect: any;

    @Input('datasForSelectSubject')
    public datasForSelectSubject = new Subject();

    @Input('refreshSubject')
    public refreshSubject = new Subject();

    // The parent can bind to this event
    @Output() datasSelected = new EventEmitter();

    @Input('selectedDatas')
    public selectedDatas: any;

    public selectOptions: any;

    public item: any;
    public items: any;
    public typeahead = new EventEmitter<string>();

    constructor(public http: HttpClient,
                public cd: ChangeDetectorRef) {
        this.initSelect();
    }

    ngOnInit(): void {
        this.subscribeParentEvent();

        if (this.service) {
            this.service.getAll(this.searchStr).subscribe((resp: any) => {
                this.datasForSelect = resp.content;
                console.log(resp.content);
            });
        }
    }

    initSelect() {
        this.typeahead
            .pipe(
                debounceTime(1000),
                switchMap(term => this.getItemsBySearch(term))
            )
            .subscribe((items: any) => {
                this.datasForSelect = items.content;
                this.processDataForSelect();
                this.cd.markForCheck();
            }, (err) => {
                console.log('error', err);
                this.datasForSelect = [];
                this.cd.markForCheck();
            });
    }

    datasChanged($event) {
        console.log($event);
        this.selectedDatas = $event;
        this.datasSelected.emit($event);
    }

    getItemsBySearch(term?: string): Observable<any[]> {
        if (term) {
            this.searchStr = '&search=' + term;
        }
        return this.service.getAll(this.searchStr);
    }

    processDataForSelect() {
        if (this.datasForSelect && this.datasForSelect.length > 0) {
            this.datasForSelect.map(p => {
                if (!p.text && p.name) {
                    p.text = p.name;
                }
                p.id = p.pk;
            });
        }
    }

    subscribeParentEvent() {
        if (this.dataIdForLoadSubject) {
            this.dataIdForLoadSubject.subscribe(event => {
                console.log(event);
                this.selectedDatas = [this.datasForSelect.find(p =>
                    p.id === event
                )];
            });
        }

        if (this.datasForSelectSubject) {
            this.datasForSelectSubject.subscribe(event => {
                console.log(event);
                this.datasForSelect = event;
                this.processDataForSelect();
            });
        }

        if (this.datasForLoadSubject) {
            this.datasForLoadSubject.subscribe(event => {
                console.log(event);
                this.datasForLoad = event;
                if (this.datasForLoad && this.datasForLoad.length > 0) {
                    // this.datasForLoad.map(p => {
                    //     // p.name = p.name;
                    //     p.id = p.id;
                    // });
                    this.selectedDatas = this.datasForLoad;
                } else if (this.datasForLoad) {
                    this.selectedDatas = this.datasForLoad
                }
            });
        }
    }
}
