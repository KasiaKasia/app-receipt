import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, empty, retry, RetryConfig, throwError } from 'rxjs';
import { inject, InjectionToken } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';

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
  const snackBar = inject(MatSnackBar);
  const logger = inject(LoggerService);

  return next(req).pipe(retry(retryConfig),

    catchError((Error: any, caught) => {
      switch (Error.status) {
        case 0: // Brak połączenia z serwerem
          snackBar.open('Server is currently offline. Please try again later.', 'Close', { duration: 5000 });
          break;
        case 401: // Nieautoryzowany
          snackBar.open('Unauthorized access. Please log in again.', 'Close', { duration: 5000 });
          break;
        case 403: // Zabroniony
          logger.error('Forbidden access');
          break;
        case 404: // Nie znaleziono
          logger.error('Resource not found');
          break;
        case 500: // Błąd serwera
          snackBar.open('Server error. Please try again later.', 'Close', { duration: 5000 });
          break;
        default: // Inne błędy
          snackBar.open('An error occurred. Please try again.', 'Close', { duration: 5000 });
      }
      return throwError(() => new Error('An issue occurred. Please try again later.'));
    })
  );
};
