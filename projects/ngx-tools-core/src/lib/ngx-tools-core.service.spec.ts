import { TestBed, inject } from '@angular/core/testing';

import { NgxToolsCoreService } from './ngx-tools-core.service';

describe('NgxToolsCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxToolsCoreService]
    });
  });

  it('should be created', inject([NgxToolsCoreService], (service: NgxToolsCoreService) => {
    expect(service).toBeTruthy();
  }));
});
