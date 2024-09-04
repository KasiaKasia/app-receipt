import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, empty, retry, RetryConfig, throwError } from 'rxjs';
import { inject, InjectionToken } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

export const RETRY_INTERCEPTOR_CONFIG = new InjectionToken<RetryConfig>(
  'retryConfig',
  {
    providedIn: 'root',
    factory: () => {
      return { count: 2, delay: 1000 } as RetryConfig;
    },
  }
);

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const retryConfig = inject(RETRY_INTERCEPTOR_CONFIG);
  const auth = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  const logger = inject(LoggerService);

  return next(req).pipe(retry(retryConfig),

    catchError((Error: any, caught) => {
      if (Error instanceof HttpErrorResponse && Error.status === 0) {
        snackBar.open('Server is currently offline. Please try again later.', 'Close', {
          duration: 5000,
        });
      } else if (Error instanceof HttpErrorResponse && Error.status === 401) {
        return empty();
      } else if (Error instanceof HttpErrorResponse && Error.status === 403) {
        logger.error('Forbidden');
        return empty();
      } else if (Error instanceof HttpErrorResponse && Error.status === 404) {
        logger.error('Not Found');
        return empty();
      } else if (Error instanceof HttpErrorResponse && Error.status >= 500) {
        logger.error('Server is currently offline. Please try again later.');
        return empty();
      }
      return throwError(() => new Error('An issue occurred. Please try again later.'));
    })
  );
};
