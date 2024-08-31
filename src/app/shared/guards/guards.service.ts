import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggerService } from '../logger/logger.service';
import { AuthService } from '../services/auth.service';
import { UserRegistrationComponent } from 'src/app/user/user-registration/user-registration.component';

@Injectable({
  providedIn: 'root'
})
export class GuardCanActivateCanDeactivateCanActivateChildCanLoadCanMatch {
  readonly #authService = inject(AuthService);
 // readonly #logger = inject(LoggerService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.#authService.getIsAuthenticated();
  }

  canDeactivate(component: UserRegistrationComponent): boolean | Observable<boolean> | Promise<boolean> {
    return !!(component.registrationForm.valid);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.#authService.getIsAuthenticated();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let urlPath = route.path;
    if (urlPath !== 'user') {
      console.error('unauthorised the page');
      return false;
    }
    return true;
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.#authService.getIsAuthenticated()  ? true : false
  }
}