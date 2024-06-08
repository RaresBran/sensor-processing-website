import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {FooterComponent} from "./shared/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
}
