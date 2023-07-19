import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarAnnotatedComponent } from './snack-bar-annotated.component';

describe('SnackBarAnnotatedComponent', () => {
  let component: SnackBarAnnotatedComponent;
  let fixture: ComponentFixture<SnackBarAnnotatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SnackBarAnnotatedComponent]
    });
    fixture = TestBed.createComponent(SnackBarAnnotatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
