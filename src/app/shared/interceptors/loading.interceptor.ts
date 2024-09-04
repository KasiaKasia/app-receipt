import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from 'src/app/modules/receipt/service/loading/loading.service';
import { LoggerService } from '../logger/logger.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const logger = inject(LoggerService);
  const loadingService = inject(LoadingService);  
  loadingService.updateLoading(true) 

  return next(req).pipe( 
    finalize(() => loadingService.updateLoading(false)),  
    catchError((error: HttpErrorResponse) => {
      logger.error('Error occurred: '+ error);
      loadingService.updateLoading(false);  
      return throwError(() => new Error('An issue occurred. Please try again later.'));
    })
  );
};
