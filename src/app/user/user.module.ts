import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    UserRegistrationComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule, 
    UserRoutingModule,
    ReactiveFormsModule     
  ],
  exports: [
    UserComponent,
    UserRegistrationComponent,
    UserLoginComponent
  ]
})
export class UserModule {}
