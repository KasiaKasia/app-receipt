import { TestBed } from '@angular/core/testing';
import { ReceiptSignalsService } from './receipt-signals.service';

describe('ReceiptService', () => {
  let service: ReceiptSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
