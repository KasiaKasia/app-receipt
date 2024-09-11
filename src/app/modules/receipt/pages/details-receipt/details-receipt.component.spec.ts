import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReceiptComponent } from './details-receipt.component';

describe('DetailsReceiptComponent', () => {
  let component: DetailsReceiptComponent;
  let fixture: ComponentFixture<DetailsReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsReceiptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
