import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxToolsCoreComponent } from './ngx-tools-core.component';

describe('NgxToolsCoreComponent', () => {
  let component: NgxToolsCoreComponent;
  let fixture: ComponentFixture<NgxToolsCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxToolsCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxToolsCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
