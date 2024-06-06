import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "./shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    RouterModule,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
}
