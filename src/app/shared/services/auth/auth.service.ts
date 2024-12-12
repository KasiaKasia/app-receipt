import { Injectable, signal } from '@angular/core';
import { Session, User } from '../../models/interface-user';
import { Settings } from '../../config/settings';
import { LoggerService } from '../../logger/logger.service';
import { catchError, share, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IsAuthenticatedLocalStorageService } from '../local-storage/is-authenticated/is-authenticated-local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    /*
    Te ustawienie dla przesyłania ciasteczek  
          withCredentials: true 
    dodaje w interceptorze withCredentialsInterceptor   
    */
  };

  #userSignal = signal<any>({})
  user = this.#userSignal.asReadonly()

  constructor(private isAuthenticatedLocalStorageService: IsAuthenticatedLocalStorageService,
    private http: HttpClient,
    private router: Router,
    private logger: LoggerService) { }
  login(user: User) {
    return this.http.post<Session>(Settings.BASE_END_POINT + '/login', JSON.stringify(user), this.httpOptions
    ).pipe(
      take(1),
      tap(state => {
        this.#userSignal.set(state.respons);
        this.isAuthenticatedLocalStorageService.setIsAuthenticated(true)
      }), share())
  }

  registration(newUser: User): Observable<Session> {
    return this.http.post<User>(Settings.BASE_END_POINT + `/register`, newUser, this.httpOptions)
      .pipe(
        take(1),
        catchError(this.handleError<User>('Add User'))
      );
  }

  public loginOut(): void {
    this.isAuthenticatedLocalStorageService.removeIsAuthenticated()
    this.router.navigate(['/']);
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      this.logger.info(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}