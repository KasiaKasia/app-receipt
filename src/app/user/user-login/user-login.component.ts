import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoggerService } from 'src/app/shared/logger/logger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  loginForm: FormGroup = this.fb.group({
    username: ['', { updateOn: 'blur' }, [Validators.required, Validators.minLength(3)]],
    password: ['', { updateOn: 'submit' }, Validators.required]
  });
  constructor(private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private logger: LoggerService ) {}

  login() {
    if (this.loginForm.invalid) {  
      return;  
    }  
    if (this.loginForm.dirty && this.loginForm.valid) {
      
      this.authService.login(this.loginForm.value).subscribe(
        req => {
          switch (req.success && !!req.token) {
            case false: {
              this.logger.error(`Error code ${req.message}`);
              break;
            }
            case true: {
              this.logger.success('Logged in successfully!');
              this.router.navigate(['/']);
              break;
            }
            default: {
              break;
            }
          }
        },
        error => {
      //    this.logger.error('error.message ' + error.message)
        }
      )
    }
  }
}
