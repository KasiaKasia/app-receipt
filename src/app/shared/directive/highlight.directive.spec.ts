import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { TestBed } from '@angular/core/testing';
import { ReceiptListComponent } from 'src/app/modules/receipt/pages/receipt-list/receipt-list.component';

export class MockElementRef extends ElementRef { }

beforeEach(() => {
  const fixture = TestBed.configureTestingModule({
    declarations: [ReceiptListComponent, HighlightDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
    .createComponent(ReceiptListComponent);
  fixture.detectChanges(); // initial binding

  it('should have black  <th>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('th');
    const bgColor = h2.style.backgroundColor;
    expect(bgColor).toBe('black');
  });
});
