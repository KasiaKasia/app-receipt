import { Component } from '@angular/core';
import { User, UserType } from 'src/app/shared/models/interface-user';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoggerService } from 'src/app/shared/logger/logger.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  title = 'Rejestracja';
  CustomerType = UserType;
  registrationForm = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    password: this.fb.control('', [
      Validators.required,
      this.validatePassword.bind(this)
    ]), // duża litera, mała litera i liczbę  Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$')
    repeatPassword: this.fb.control(''),
    email: this.fb.control('', [Validators.required, Validators.email]),
    type: this.makeFormControl(),
  }, {
    validator: (control: FormGroup) => {
      const values = control.value
      if (values.password !== values.repeatPassword) {
        return {
          password_match: true
        }
      }
      return null;
    }
  });


  constructor(private fb: FormBuilder,
        private logger: LoggerService,
    private authService: AuthService,
    private router: Router) { }


  makeFormControl(): FormControl {
    const cloned = new FormControl('');
    return cloned;
  }

  validatePassword<ValidatorFn>(control: FormControl): ValidationErrors {
    const hasUppercase = control.value.match(/[A-Z]/);
    const hasLowercase = control.value.match(/[a-z]/);

    if (hasUppercase && hasLowercase) {
      return {};
    }
    if (hasUppercase === null) {
      return {
        'uppercase': false,
      } as ValidationErrors;

    }
    if (hasLowercase === null) {
      return {
        'lowercase': false,
      } as ValidationErrors;

    } else {
      return {
        'password': true,
        'uppercase': true,
        'lowercase': true,
      } as ValidationErrors;
    }
  }


  registration(): void {
    if (this.registrationForm.dirty && this.registrationForm.valid) {
      this.authService.registration(this.registrationForm.value as User).subscribe(data => {
        switch (data.success) {
          case false: {
            this.logger.error(`Error code ${data.message}`)
            break;
          }
          case true: {
            this.logger.success('User created successfully, please login to access your account.');
            this.router.navigate(['user/login']);
            this.registrationForm.reset();
            break;
          }
          default: {
            this.registrationForm.reset();
            break;
          }
        }
      }, (Error: any) => {
        if (Error instanceof HttpErrorResponse) {
          this.logger.error('Error name: ' + Error.error);
          this.logger.error('Error status text: ' + Error.statusText);
          this.logger.error('Error status: ' + Error.status);
        }
      });
    }
  }
}

