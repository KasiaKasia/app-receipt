import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RouterModule } from '@angular/router';
import { GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch } from '../shared/guards/guards.service';

const routes = [{
  path: '',
  component: UserComponent,
  children: [
    {
      path: 'registration',
      component: UserRegistrationComponent,
      // canDeactivate: [GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch]
    }, {
      path: 'login',
      component: UserLoginComponent
    }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {}
