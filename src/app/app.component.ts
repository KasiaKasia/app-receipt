import { Component, Provider } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { AuthService } from './shared/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService, RETRY_INTERCEPTOR_CONFIG } from './shared/interceptor/auth-interceptor.service';
import { ReceiptService } from './modules/receipt/service/receipt/receipt.service';
import { ReceiptModule } from './modules/receipt/receipt.module';
import { FileService } from './modules/receipt/service/file/file.service';

export const RetryInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};

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
  ],
  providers: [
    RetryInterceptorProvider,
    {
      provide: RETRY_INTERCEPTOR_CONFIG,
      useValue: { count: 5, delay: 1000 }, // wartość 5 oznacza , że w przypadku odpwiedzi błędnej z serwera zapyanie zostanie wykonane dodatkowo 5 razy na sekundę  
    },
    AuthService,
    ReceiptService,
    FileService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { } 