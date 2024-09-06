import { TestBed } from '@angular/core/testing';

import { CharactersSignalsService } from './characters-signals.service';

describe('CharactersSignalsService', () => {
  let service: CharactersSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactersSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
