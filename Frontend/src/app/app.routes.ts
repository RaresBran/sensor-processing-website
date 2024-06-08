import {Routes} from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

export const routes: Routes = [
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
