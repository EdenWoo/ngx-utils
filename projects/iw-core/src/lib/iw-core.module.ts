import {ModuleWithProviders, NgModule} from '@angular/core';
import {IwCoreComponent} from './iw-core.component';
import {IwNgSelectComponent} from './iw-ng-select/iw-ng-select.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IwDropzoneComponent} from './iw-dropzone/iw-dropzone.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {IwCkeditorComponent} from './iw-ckeditor/iw-ckeditor.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropzoneModule,
    CKEditorModule
  ],
  declarations: [
    IwCoreComponent,
    IwNgSelectComponent,
    IwDropzoneComponent,
    IwCkeditorComponent
  ],
  exports: [
    IwCoreComponent,
    IwNgSelectComponent,
    IwDropzoneComponent,
    IwCkeditorComponent
  ]
})
export class IwCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IwCoreModule,
      providers: []
    };
  }
}
