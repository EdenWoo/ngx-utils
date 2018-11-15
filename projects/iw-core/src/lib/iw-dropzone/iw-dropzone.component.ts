import {AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Host, Input, OnInit, Optional, Output, SkipSelf, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AbstractValueAccessor, MakeProvider} from '../abstract-value-accessor';
import {AbstractControl, ControlContainer} from '@angular/forms';
import {ImageModel} from '../../models/bases/image.model';
import {DropzoneComponent, DropzoneConfig} from 'ngx-dropzone-wrapper';
import {MyNotifyService} from '../../services/my-notify.service';
import {DownloadService} from '../../services/download.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Constants} from '../../constants/app.constant';

declare var $: any;

@Component({
    selector: 'iw-dropzone',
    templateUrl: './iw-dropzone.component.html',
    providers: [MakeProvider(IwDropzoneComponent)]
})
export class IwDropzoneComponent extends AbstractValueAccessor implements OnInit, AfterContentChecked {

    @Input() formControlName: string;
    @Input() formControl: AbstractControl;


    public files: any = [];


    @Input('maxFiles')
    public maxFiles: number;

    @Input('url')
    public url: string;

    @Input('subject')
    public subject: Subject<ImageModel[]> = new Subject<ImageModel[]>();

    @Input('filesFromServer')
    public filesFromServer: ImageModel[] = [];

    // file output
    @Output() filesChanged = new EventEmitter();
    @Output() fileObjectsChanged = new EventEmitter();

    @ViewChild('dropzoneFile') dropzoneFile: DropzoneComponent;
    public config: any;
    public tconfig: DropzoneConfig;


    @Input('uploadAndImportSubject')
    public uploadAndImportSubject: Subject<string>;

    @Input('resetDropzoneSubject')
    public resetDropzoneSubject: Subject<string>
    public reachedMaxFiles = false;

    @Input('autoProcessQueue')
    public autoProcessQueue = true; // Disable auto upload, have to call processQueue() to upload

    public token: string;


    constructor(public http: HttpClient,
                @Optional() @Host() @SkipSelf()
                private controlContainer: ControlContainer,
                public cd: ChangeDetectorRef,
                public myNotifyService: MyNotifyService,
                public downloadService: DownloadService,
                public authenticationService: AuthenticationService) {
        super();
        this.token = this.authenticationService.getToken();
        this.config = {
            headers: {
                'Authorization': 'Bearer ' + this.token
            },
            addRemoveLinks: true,
            clickable: true
        };
        console.log(this.config);
    }

    ngOnInit(): void {
        this.formControlLogic();

        this.config.autoProcessQueue = this.autoProcessQueue; // Disable auto upload, have to call processQueue() to upload
        this.getFileFromParentSubject();
        this.registerUploadAndImportSubject();
        this.registerResetDropzoneSubject();
        if (this.url) {
            this.config.url = this.url;
        }
        if (this.maxFiles) {
            this.config.maxFiles = this.maxFiles;
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

    writeValue(value: any) {
        this._value = value;
        // warning: comment below if only want to emit on user intervention
        this.onChange(value);
        console.log(this._value);
    }

    ngAfterContentChecked(): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }


    /**
     *  ------------------------------------------------------------
     *  ------------------  drop zone files BEGIN-------------------
     *  ------------------------------------------------------------
     * */


    getFileFromParentSubject() {
        if (this.subject) {
            this.subject.subscribe(resp => {
                this.filesFromServer = resp;
                console.log(resp);
                this.loadDropzoneFiles();
            });
        }
    }

    loadDropzoneFiles() {
        // console.log(this.filesFromServer);
        if (this.filesFromServer && this.filesFromServer.length > 0) {
            this.emitFiles();
        }
    }

    emitFiles() {
        this.filesFromServer.forEach(file => {
            file.name = file.originalName;
            // Call the default addedfile event handler
            this.dropzoneFile.directiveRef.dropzone.emit('addedfile', file);

            // And optionally show the thumbnail of the file:
            // dropzone.emit("thumbnail", this.files, "/image/url");
            // Or if the file on your server is not yet in the right
            // size, you can let Dropzone download and resize it
            // callback and crossOrigin are optional.
            this.dropzoneFile.directiveRef.dropzone.createThumbnailFromUrl(file);

            // Make sure that there is no progress bar, etc...
            this.dropzoneFile.directiveRef.dropzone.emit('complete', file);
            this.dropzoneFile.directiveRef.dropzone.emit('success', file, file, file);
        })
    }

    onUploadError(file) {
        console.log(file);
        this.myNotifyService.notifyFail('File upload error, please have a check and try again.');
        if (this.maxFiles === 1) {
            this.dropzoneFile.reset();
        }
        // this.dropzoneFile.directiveRef.dropzone.dictRemoveFile(event);
    }

    onUploadSuccess(file: ImageModel) {
        // console.log(file);
        // console.log('======= add file=======');

        // let a1 = document.createElement('a');
        // a1.setAttribute('href', Constants.API_ENDPOINT + file[1].fullPath);
        // a1.className = 'dz-remove';
        // a1.href = 'javascript:undefined;';
        // a1.setAttribute('data-dz-remove','');
        // a1.innerHTML = '<br><i class="fa fa-trash" aria-hidden="true"></i>remove';
        // file[0].previewTemplate.appendChild(a1);

        const a = document.createElement('a');
        // a.setAttribute('href', Constants.API_ENDPOINT + 'download/' + file[1].id);
        a.innerHTML = '<i class="fa fa-cloud-download" aria-hidden="true"></i>download';
        a.className = 'dz-download';
        a.id = 'dz-download-file-' + file[1].id;
        a.setAttribute('download', '');
        file[0].previewTemplate.appendChild(a);
        file[0].previewElement.querySelector('img').src = Constants.API_ENDPOINT + file[1].fullPath + '&token=' + this.token;
        if (file[1] && file[1].fullPath.includes('.pdf')) {
            file[0].previewElement.querySelector('img').src = 'assets/img/vendor/pdf.png';
        }
        if (file[1] && file[1].fullPath.includes('.xls') || file[1].fullPath.includes('.xlsx')) {
            file[0].previewElement.querySelector('img').src = 'assets/img/vendor/excel.png';
        }
        if (file[1] && file[1].fullPath.includes('.txt')) {
            file[0].previewElement.querySelector('img').src = 'assets/img/vendor/txt.png';
        }
        file[0].id = file[1].id;
        this.files.push(file[1]);


        // download jquery
        const self = this;
        $('#dz-download-file-' + file[1].id).click(function () {
            // console.log('image clicked');
            // console.log(file[1].id);
            // console.log(Constants.API_ENDPOINT + 'download/' + file[1].id);
            // self.downloadService.downloadFile('download/' + file[1].id, file[1].originalName);
            self.downloadService.downloadFile(Constants.API_ENDPOINT + file[1].fullPath, file[1].originalFilename);
        });

        this.outputFiles();
    }

    removedfile(file) {
        // console.log(file);
        this.files = this.files.filter(item => item.id !== file.id);
        // console.log(this.files);
        this.outputFiles();
    }

    outputFiles() {
        let filesOutput = '';
        this.files.map(f => {
            // const myFile = new MyFile();
            // myFile.url = f.fullPath;
            // myFile.name = f.name;
            // filesOutput.push(myFile)
            filesOutput += f.id + ',';
        });
        this.filesChanged.emit(filesOutput);

        this.fileObjectsChanged.emit(this.files);
        console.log(this.files);
    }


    registerUploadAndImportSubject() {
        if (this.uploadAndImportSubject) {
            this.uploadAndImportSubject.subscribe(resp => {
                console.log('upload');
                if (this.dropzoneFile.directiveRef.dropzone.files && this.dropzoneFile.directiveRef.dropzone.files.length > 0) {
                    this.dropzoneFile.directiveRef.dropzone.processQueue();
                } else {
                    this.myNotifyService.notifyFail('There\'s nothing to upload.');
                }
            });
        }
    }

    registerResetDropzoneSubject() {
        if (this.resetDropzoneSubject) {
            this.resetDropzoneSubject.subscribe(resp => {
                console.log('reset dropzone');
                this.dropzoneFile.directiveRef.dropzone.removeAllFiles();
                this.reachedMaxFiles = false;
            });
        }
    }

    onMaxFilesExceeded(file) {
        console.log('max files exceeded');
        this.dropzoneFile.directiveRef.dropzone.removeFile(file);
    }

    onMaxFilesReached(file) {
        console.log('max files reached');
        this.reachedMaxFiles = true;
    }

}
