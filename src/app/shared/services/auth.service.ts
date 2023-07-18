import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Session, User } from '../models/interface-user';
import { Settings } from '../environments/settings';
import { LoggerService } from '../logger/logger.service';
import { catchError, share, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  public userSession = new BehaviorSubject<Session>({ token: '' });
  public userSession$ = this.userSession.asObservable();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  setIsAuthenticated(isAuthenticated: string) {
    localStorage.setItem('isAuthenticated', JSON.parse(isAuthenticated));
  }
  
  getIsAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true' ? true : false;
  }
    
  setCurrentDataUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  getCurrentDataUser() {
    return JSON.parse(JSON.stringify(localStorage.getItem('user')));
  } 

  constructor(private http: HttpClient, private router: Router ) { }
//  private logger: LoggerService,
  login(user: User) {
    return this.http.post<Session>(Settings.BASE_END_POINT + '/login', JSON.stringify(user), this.httpOptions
    ).pipe(
      take(1),
      tap(state => {
        this.setToken(state?.token ?? '');
        this.setCurrentDataUser(state?.respons ?? {});
        this.setIsAuthenticated('true');
        this.userSession.next(state);
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
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.userSession.next({});
    this.router.navigate(['/']);
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // this.logger.error(error);
      // this.logger.info(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
