import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly jwtHelperService: JwtHelperService = new JwtHelperService();
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem(this.TOKEN_KEY));
  token$: Observable<string | null> = this.tokenSubject.asObservable();

  constructor() {
    this.loadToken();
  }

  isTokenValid(token: string | null): boolean {
    if (!token) {
      this.clearToken();
      return false;
    }
    const isTokenExpired = this.jwtHelperService.isTokenExpired(token);
    if (isTokenExpired) {
      this.clearToken();
      return false;
    }
    return true;
  }

  getUserRoles(): string[] {
    const token = this.tokenSubject.getValue();
    if (token) {
      const decodedToken = this.jwtHelperService.decodeToken(token);
      return decodedToken.authorities;
    }
    return [];
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string | null> {
    return this.token$;
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSubject.next(null);
  }

  hasToken(): boolean {
    return !!this.tokenSubject.getValue();
  }

  private loadToken() {
    let token = localStorage.getItem(this.TOKEN_KEY)
    if (token !== null)
      this.setToken(token);
  }
}
