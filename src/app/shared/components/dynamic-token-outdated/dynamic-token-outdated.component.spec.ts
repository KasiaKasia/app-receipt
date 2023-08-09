import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicTokenOutdatedComponent } from './dynamic-token-outdated.component';

describe('DynamicTokenOutdatedComponent', () => {
  let component: DynamicTokenOutdatedComponent;
  let fixture: ComponentFixture<DynamicTokenOutdatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicTokenOutdatedComponent]
    });
    fixture = TestBed.createComponent(DynamicTokenOutdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
