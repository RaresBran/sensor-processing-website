import {Routes} from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./pages/login/login.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { // Default route
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];
