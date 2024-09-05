import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

  return next(getAuthorizedRequest(req)).pipe(
    catchError((Error: any) => {
      return throwError(() => new Error('An issue occurred. Please try again later.'));
    })
  );
}
const getAuthorizedRequest = (req: HttpRequest<any>) => {
  const authToken = inject(AuthService).getToken()

  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
}