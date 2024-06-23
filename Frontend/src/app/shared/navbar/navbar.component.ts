import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { UserDto } from '../../models/user-dto';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from "@angular/common";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe
  ],
  standalone: true
})
export class NavbarComponent {
  user$: Observable<UserDto | null>;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.user$ = this.authService.user$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['dashboard']).then();
  }
}
