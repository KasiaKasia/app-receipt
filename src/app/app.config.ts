import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideAnimations(),
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }
    // importProvidersFrom(MatNativeDateModule)
  ]
};
