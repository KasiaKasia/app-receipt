import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedLocalStorageService {
  // WŁAŚCIWOŚĆ PRYWATNA 
  readonly #IS_AUTHENTICATICATED = 'IS_AUTHENTICATICATED';

  public constructor(private storage: LocalStorageService) { }

  public get isAuthenticated(): boolean {
    return this.getIsAuthenticated();
  }

  public setIsAuthenticated(isAuthenticated: boolean): void {
    this.storage.setItem(this.#IS_AUTHENTICATICATED, JSON.stringify(isAuthenticated));
  }

  public removeIsAuthenticated(): void {
    this.storage.removeItem(this.#IS_AUTHENTICATICATED);
  }

  public getIsAuthenticated():  boolean  {
    const isAuthenticated = this.storage.getItem(this.#IS_AUTHENTICATICATED);
    return isAuthenticated ? JSON.parse(isAuthenticated) : false;
  }
}
