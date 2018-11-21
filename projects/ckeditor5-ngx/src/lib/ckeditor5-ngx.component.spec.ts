import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ckeditor5NgxComponent } from './ckeditor5-ngx.component';

describe('Ckeditor5NgxComponent', () => {
  let component: Ckeditor5NgxComponent;
  let fixture: ComponentFixture<Ckeditor5NgxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ckeditor5NgxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ckeditor5NgxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
