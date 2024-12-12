import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const withCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(getWithCredentials(req))
  .pipe(
      catchError((Error: any) => {
        return throwError(() => new Error('An issue occurred. Please try again later.'));
      })
    );
  }

const getWithCredentials = (req: HttpRequest<any>) => {
    
  if (!req.withCredentials) {  
    return req.clone({
      withCredentials: true
    });
  }
  return req
} 