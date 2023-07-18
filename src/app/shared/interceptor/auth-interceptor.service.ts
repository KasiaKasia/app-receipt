import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, RetryConfig, catchError, empty, retry, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { InjectionToken } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
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
    // private logger: LoggerService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(this.getAuthorizedRequest(req)).pipe(retry(this.retryConfig),
      catchError((Error: any, caught) => {
        if (Error instanceof HttpErrorResponse && Error.status === 401) {
          // this.logger.error('Authorization Request ');
          return empty();
        } else if (Error instanceof HttpErrorResponse && Error.status === 403) {
          // this.logger.error('Forbidden');
          return empty();
        } else if (Error instanceof HttpErrorResponse && Error.status === 404) {
          // this.logger.error('Not Found');
          return empty();
        }
        return throwError(Error);
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
