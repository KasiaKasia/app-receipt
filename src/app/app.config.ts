import { ApplicationConfig, importProvidersFrom, Provider } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { INJECTION_TOKEN } from './app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LoggerDebugService, LoggerService } from './shared/logger/logger.service';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { httpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import { PreloadingStrategyService } from './shared/preloading-strategy/preloading-strategy.service';
import { withCredentialsInterceptor } from './shared/interceptors/with-credentials.interceptor';

 

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(      
      withInterceptors([withCredentialsInterceptor, loadingInterceptor, httpErrorInterceptor]),
      withFetch(),
    ),
    {
      provide: LoggerService,
      useClass: LoggerDebugService,
    },
  
    provideRouter(routes,
      /*
       withPreloading(PreloadAllModules) - ładowanie modułów w tle, wszystkich na raz 
       withPreloading(PreloadingStrategyService) - ustala które moduły lazy loading będą ładowane na początku startu aplikacji Nie w momecie klikniecia na trasę modułu 
      */
      withPreloading(PreloadingStrategyService)),
    provideAnimations(),
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    importProvidersFrom(MatNativeDateModule),
    { provide: INJECTION_TOKEN, useValue: 'dynamically injected content' },
    //  provideClientHydration() // Server-side rendering
  ]
};
