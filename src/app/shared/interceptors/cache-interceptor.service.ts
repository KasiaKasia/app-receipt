import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const IS_CACHE_ENABLED = new HttpContextToken<boolean>(() => false);
@Injectable()
export class CacheInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
              private readonly router: Router) {}
  intercept(req: HttpRequest<any>, delegate: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(IS_CACHE_ENABLED)) {
      return delegate.handle(req);
    }

    const token = this.authService.getToken();
    if (token != null && token !== '') {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return delegate.handle(cloned);
    } else {
      this.router.navigate(['/user/login']);
      return throwError(() => new Error('Please login!'));
    }
  }
}
