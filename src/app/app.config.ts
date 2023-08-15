import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { INJECTION_TOKEN } from './app.component';
import { provideClientHydration } from '@angular/platform-browser';
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    importProvidersFrom(MatNativeDateModule),
    { provide: INJECTION_TOKEN, useValue: 'dynamically injected content' },
    provideClientHydration() // Server-side rendering
  ]
};
