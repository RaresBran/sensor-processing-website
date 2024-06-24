import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { ApiConfiguration } from "../api-configuration";
import { AuthenticationRequest } from "../../models/authentication-request";
import { AuthenticationResponse } from "../../models/authentication-response";
import { UserDto } from "../../models/user-dto";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = `${this.apiConfiguration.rootUrl}/app/auth`;
  private userSubject = new BehaviorSubject<UserDto | null>(null);
  user$: Observable<UserDto | null> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private apiConfiguration: ApiConfiguration,
    private tokenService: TokenService
  ) {
    this.tokenService.getToken().pipe(
      switchMap(token => {
        if (this.tokenService.isTokenValid(token)) {
          return this.getCurrentUser();
        } else {
          return new BehaviorSubject<UserDto | null>(null);
        }
      }),
      tap(user => this.userSubject.next(user))
    ).subscribe();
  }

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  logout(): void {
    this.http.post<void>(`${this.baseUrl}/logout`, {});
    this.tokenService.clearToken();
    this.userSubject.next(null);
  }

  getCurrentUser(): Observable<UserDto | null> {
    return this.http.get<UserDto | null>(this.baseUrl);
  }

  private loadCurrentUser() {
    this.getCurrentUser().pipe(
      tap(user => {
        this.userSubject.next(user)
      })
    ).subscribe();
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }

  isAdmin(): boolean {
    return this.tokenService.getUserRoles().includes('ROLE_ADMIN');
  }

  private handleAuthResponse(response: AuthenticationResponse): void {
    if (this.tokenService.isTokenValid(response.token ?? null)) {
      this.tokenService.setToken(response.token ?? '');
      this.loadCurrentUser();
    }
  }
}
