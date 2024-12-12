import { TestBed } from '@angular/core/testing';

import { IsAuthenticatedLocalStorageService } from './is-authenticated-local-storage.service';

describe('IsAuthenticatedLocalStorageService', () => {
  let service: IsAuthenticatedLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAuthenticatedLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
