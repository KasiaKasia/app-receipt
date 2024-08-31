import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoggerService } from 'src/app/shared/logger/logger.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, NgIf],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  public incorrectPasswordOrLogin = { status: false, text: 'incorrect password or login' }
  title = 'Logowanie użytkownika';
  loginForm: FormGroup = this.fb.group({
    username: ['',  [Validators.required, Validators.minLength(3)]],
    password: ['', Validators.required]
  });
  constructor(
    private router: Router,
    private authService: AuthService,
    private logger: LoggerService) { }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.dirty && this.loginForm.valid) {

      this.authService.login(this.loginForm.value).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
        next: (data: any) => {
          if (data.success && !!data.token) {
            this.logger.success('Logged in successfully!');
            this.router.navigate(['/']);
          }
          if (!data.success && data.code === 200) {
            this.logger.success('Invalid username or password.');
            this.incorrectPasswordOrLogin.status = true;
          }
        },
        error: (error) => {
          this.logger.error('ERROR ' + error)
          this.logger.error('error.message ' + error.message)
        },
        complete: () => { }
      })
    }
  }
}
