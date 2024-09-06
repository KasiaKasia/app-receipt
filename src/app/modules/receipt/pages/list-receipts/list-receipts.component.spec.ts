import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListReceiptsComponent } from './list-receipts.component';

describe('ListReceiptsComponent', () => {
  let component: ListReceiptsComponent;
  let fixture: ComponentFixture<ListReceiptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListReceiptsComponent]
    });
    fixture = TestBed.createComponent(ListReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
