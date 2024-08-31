import { Component, HostListener, InjectionToken, Injector, OnInit, Provider, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { AuthService } from './shared/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService, RETRY_INTERCEPTOR_CONFIG } from './shared/interceptors/auth-interceptor.service';
import { ReceiptService } from './modules/receipt/service/receipt/receipt.service';
import { ReceiptModule } from './modules/receipt/receipt.module';
import { FileService } from './modules/receipt/service/file/file.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { LoggerDebugService, LoggerService } from './shared/logger/logger.service';
import { DynamicTokenComponent } from './shared/components/dynamic-token/dynamic-token.component';
import { DynamicTokenOutdatedComponent } from './shared/components/dynamic-token-outdated/dynamic-token-outdated.component';
import { CacheInterceptorService } from './shared/interceptors/cache-interceptor.service';

export const RetryInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};

export const CacheInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CacheInterceptorService,
  multi: true,
};
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY.MM.DD',
  },
  display: {
    dateInput: 'YYYY.MM.DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

export const INJECTION_TOKEN = new InjectionToken<string>('INJECTION_TOKEN')

export const dynamicInjectionFn = () => {
  const injector = inject(Injector);

  return () => Injector.create({
    providers: [{ provide: INJECTION_TOKEN, useValue: 'dynamically injected content' }],
    parent: injector
  })
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CoreModule,
    UserModule,
    SharedModule,
    HttpClientModule,
    ReceiptModule,
    MomentDateModule,

  ],
  providers: [
 
     // RetryInterceptorProvider,
      CacheInterceptorProvider,
    {
      provide: RETRY_INTERCEPTOR_CONFIG,
      useValue: { count: 5, delay: 1000 }, // wartość 5 oznacza , że w przypadku odpwiedzi błędnej z serwera zapyanie zostanie wykonane dodatkowo 5 razy na sekundę  
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    AuthService,
    ReceiptService,
    FileService,
    {
      provide: LoggerService,
      useClass: LoggerDebugService,
    }
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  injector = inject(Injector)
  componentInjector!: Injector;
  dynamicInjector = dynamicInjectionFn()
  dynamicComponent = DynamicTokenComponent;
  clickStatus = false;

  ngOnInit() {
    this.refreshToken();
  }

  refreshToken() {
    if (!this.clickStatus) {
      setInterval(() => {
        this.clickStatus = false;
        this.dynamicComponent = DynamicTokenOutdatedComponent;
        this.componentInjector = this.dynamicInjector()
      }, 9000);
    }
  }

  @HostListener("document:click") outClickHandler() {
    this.clickStatus = true;
    this.refreshToken()
  }
} 