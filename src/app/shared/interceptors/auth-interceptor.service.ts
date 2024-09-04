import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, RetryConfig, catchError, empty, retry, throwError } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../logger/logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const RETRY_INTERCEPTOR_CONFIG = new InjectionToken<RetryConfig>(
  'retryConfig',
  {
    providedIn: 'root',
    factory: () => {
      return { count: 2, delay: 1000 } as RetryConfig;
    },
  }
);
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private retryConfig = inject(RETRY_INTERCEPTOR_CONFIG);
  constructor(private auth: AuthService,
    private snackBar: MatSnackBar,
    private logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(retry(this.retryConfig),

      //  return next.handle(this.getAuthorizedRequest(req)).pipe(
      catchError((Error: any, caught) => {
        if (Error instanceof HttpErrorResponse && Error.status === 0) {
          this.snackBar.open('Server is currently offline. Please try again later.', 'Close', {
            duration: 5000,
          });
        } else if (Error instanceof HttpErrorResponse && Error.status === 401) {
          return empty();
        } else if (Error instanceof HttpErrorResponse && Error.status === 403) {
          this.logger.error('Forbidden');
          return empty();
        } else if (Error instanceof HttpErrorResponse && Error.status === 404) {
          this.logger.error('Not Found');
          return empty();
        } else if (Error instanceof HttpErrorResponse && Error.status >= 500) {
          this.logger.error('Server is currently offline. Please try again later.');
          return empty();
        }
        return throwError(() => new Error('An issue occurred. Please try again later.'));
      })
    );
  }
  getAuthorizedRequest(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
  }
}
