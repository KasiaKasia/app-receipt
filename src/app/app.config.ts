import { ApplicationConfig, importProvidersFrom, inject, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { INJECTION_TOKEN } from './app.component';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient,  withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './shared/interceptors/auth-interceptor.service';
import { LoggerDebugService, LoggerService } from './shared/logger/logger.service';
export const RetryInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};


export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LoggerService,
      useClass: LoggerDebugService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    importProvidersFrom(MatNativeDateModule),
    { provide: INJECTION_TOKEN, useValue: 'dynamically injected content' },
    provideClientHydration() // Server-side rendering
  ]
};
