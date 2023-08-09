import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicTokenComponent } from './dynamic-token.component';

describe('DynamicTokenComponent', () => {
  let component: DynamicTokenComponent;
  let fixture: ComponentFixture<DynamicTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicTokenComponent]
    });
    fixture = TestBed.createComponent(DynamicTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
