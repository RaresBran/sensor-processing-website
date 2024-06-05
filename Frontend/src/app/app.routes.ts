import {Routes} from '@angular/router';

export const routes: Routes = [
  { // Default route
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];
