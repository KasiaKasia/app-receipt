import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptAdditionComponent } from './receipt-addition.component';

describe('ReceiptAdditionComponent', () => {
  let component: ReceiptAdditionComponent;
  let fixture: ComponentFixture<ReceiptAdditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReceiptAdditionComponent]
    });
    fixture = TestBed.createComponent(ReceiptAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
