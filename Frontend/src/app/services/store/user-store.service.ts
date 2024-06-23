import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserDto } from '../../models/user-dto';
import { ApiConfiguration } from '../api-configuration';
import {TokenService} from "../services/token.service";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private userSubject = new BehaviorSubject<UserDto | null>(null);
  user$: Observable<UserDto | null> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private apiConfiguration: ApiConfiguration,
    private tokenService: TokenService,
    private authService: AuthenticationService
  ) {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.loadCurrentUser();
      } else {
        this.clearUser();
      }
    });
  }

  private loadCurrentUser() {
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<UserDto>(`${this.apiConfiguration.rootUrl}/app/auth`, { headers })
        .pipe(tap(user => this.userSubject.next(user)))
        .subscribe();
    }
  }

  setUser(user: UserDto) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }
}
