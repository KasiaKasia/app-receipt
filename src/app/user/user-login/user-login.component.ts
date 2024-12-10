import { Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardHeadingComponent } from 'src/app/shared/components/dashboard-heading/dashboard-heading.component';
import { BasicFormService } from 'src/app/shared/services/basic-form/basic-form.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, DashboardHeadingComponent],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  private destroyRef = inject(DestroyRef);
  private readonly basicFormService = inject(BasicFormService);
  protected readonly loginForm = this.basicFormService.createForm()
  protected readonly title = 'Logowanie użytkownika';

  constructor(
    private router: Router,
    private authService: AuthService) {}

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .pipe(
        takeUntilDestroyed(this.destroyRef),       
      ).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  } 
}
