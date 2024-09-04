import { ApplicationConfig, importProvidersFrom, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { INJECTION_TOKEN } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './shared/interceptors/auth-interceptor.service';
import { LoggerDebugService, LoggerService } from './shared/logger/logger.service';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { httpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

export const RetryInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([loadingInterceptor, httpErrorInterceptor]),
      withFetch()
    ),
    {
      provide: LoggerService,
      useClass: LoggerDebugService,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true,
    // },
    provideRouter(routes),
    provideAnimations(),
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    importProvidersFrom(MatNativeDateModule),
    { provide: INJECTION_TOKEN, useValue: 'dynamically injected content' },
    //  provideClientHydration() // Server-side rendering
  ]
};
