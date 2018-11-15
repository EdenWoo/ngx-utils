import {ChangeDetectorRef, Component, EventEmitter, Host, Input, OnInit, Optional, Output, SkipSelf, ViewChild} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AbstractValueAccessor, MakeProvider} from '../abstract-value-accessor';
import {AbstractControl, ControlContainer} from '@angular/forms';

@Component({
    selector: 'iw-ng-select',
    templateUrl: './iw-ng-select.component.html',
    providers: [MakeProvider(IwNgSelectComponent)]
})
export class IwNgSelectComponent extends AbstractValueAccessor implements OnInit {

    @Input() formControlName: string;
    @Input() formControl: AbstractControl;

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

    @Input() public datasForLoad: any;

    @Input('items') public _items: any; // 下拉列表

    @Input('refreshSubject')
    public refreshSubject = new Subject();

    // The parent can bind to this event
    @Output() datasSelected = new EventEmitter();

    public selectOptions: any;

    public item: any;
    public typeahead = new EventEmitter<string>();

    constructor(public http: HttpClient,
                @Optional() @Host() @SkipSelf()
                private controlContainer: ControlContainer,
                public cd: ChangeDetectorRef) {
        super();
        this.initSelect();
    }

    ngOnInit(): void {

        this.formControlLogic();
        this.subscribeParentEvent();

        if (this.service) {
            this.service.getAll(this.searchStr).subscribe((resp: any) => {
                this._items = resp.content;
                console.log(resp.content);
            });
        }
    }

    formControlLogic() {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.formControl = this.controlContainer.control.get(this.formControlName);
            } else {
                console.warn('Missing FormControlName directive from host element of the component');
            }
        } else {
            console.warn('Can\'t find parent FormGroup directive');
        }
    }

    // Allows Angular to register a function to call when the input has been touched.
    // Save the function as a property to call later here.
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    initSelect() {
        this.typeahead
            .pipe(
                debounceTime(1000),
                switchMap(term => this.getItemsBySearch(term))
            )
            .subscribe((resp: any) => {
                this._items = resp.content;
                this.processDataForSelect();
                this.cd.markForCheck();
            }, (err) => {
                console.log('error', err);
                this._items = [];
                this.cd.markForCheck();
            });
    }

    datasChanged($event) {
        console.log($event);
        // this.selectedDatas = $event;
        this.datasSelected.emit($event);
    }

    getItemsBySearch(term?: string): Observable<any[]> {
        if (term) {
            this.searchStr = '&search=' + term;
        }
        return this.service.getAll(this.searchStr);
    }

    processDataForSelect() {
        if (this._items && this._items.length > 0) {
            this._items.map(p => {
                if (!p.text && p.name) {
                    p.text = p.name;
                }
                p.id = p.pk;
            });
        }
    }

    subscribeParentEvent() {
        // if (this.dataIdForLoadSubject) {
        //     this.dataIdForLoadSubject.subscribe(event => {
        //         console.log(event);
        //         this.selectedDatas = [this._items.find(p =>
        //             p.id === event
        //         )];
        //     });
        // }
        //
        // if (this.itemsSubject) {
        //     this.itemsSubject.subscribe(event => {
        //         console.log(event);
        //         this._items = event;
        //         this.processDataForSelect();
        //     });
        // }

        // if (this.datasForLoadSubject) {
        //     this.datasForLoadSubject.subscribe(event => {
        //         console.log(event);
        //         this.datasForLoad = event;
        //         if (this.datasForLoad && this.datasForLoad.length > 0) {
        //             // this.datasForLoad.map(p => {
        //             //     // p.name = p.name;
        //             //     p.id = p.id;
        //             // });
        //             this.selectedDatas = this.datasForLoad;
        //         } else if (this.datasForLoad) {
        //             this.selectedDatas = this.datasForLoad
        //         }
        //     });
        // }
    }

    writeValue(value: any) {
        this._value = value;
        // warning: comment below if only want to emit on user intervention
        this.onChange(value);
        console.log(this._value);
    }

}
