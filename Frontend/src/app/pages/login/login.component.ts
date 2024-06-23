import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {AuthenticationRequest} from '../../models/authentication-request';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate(this.authRequest)
      .subscribe({
        next: (res) => {
          this.router.navigate(['dashboard']).then();
        },
        error: (err) => {
          console.log(err);
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg.push(err.error.businessErrorDescription);
          }
        }
      });
  }

  register() {
    this.router.navigate(['register']).then();
  }
}
