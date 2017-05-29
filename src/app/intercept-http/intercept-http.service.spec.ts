import { TestBed, inject } from '@angular/core/testing';

import { InterceptHttpService } from './intercept-http.service';

describe('InterceptHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterceptHttpService]
    });
  });

  it('should be created', inject([InterceptHttpService], (service: InterceptHttpService) => {
    expect(service).toBeTruthy();
  }));
});
