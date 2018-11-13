import {NgModule} from '@angular/core';
import {IwCoreComponent} from './iw-core.component';
import {IwNgSelectComponent} from './iw-ng-select/iw-ng-select.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    NgSelectModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    IwCoreComponent,
    IwNgSelectComponent
  ],
  exports: [
    IwCoreComponent,
    IwNgSelectComponent
  ]
})
export class IwCoreModule {
}
