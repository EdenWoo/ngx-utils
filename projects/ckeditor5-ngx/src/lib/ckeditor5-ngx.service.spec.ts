import { TestBed, inject } from '@angular/core/testing';

import { Ckeditor5NgxService } from './ckeditor5-ngx.service';

describe('Ckeditor5NgxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ckeditor5NgxService]
    });
  });

  it('should be created', inject([Ckeditor5NgxService], (service: Ckeditor5NgxService) => {
    expect(service).toBeTruthy();
  }));
});
