import { Routes } from '@angular/router';
import {MainLayoutComponent} from './pages/layout/main-layout/main-layout.component';


export const routes: Routes = [
  {
    // Auth pages — no layout, no guard
    path: 'auth',
    loadChildren: () =>
      // import('./auth/auth.routes').then((m) => m.authRoutes),
      import('./pages/auth/auth-routing-module').then((m) => m.authRoutes),
  },
  {
    path: 'layout',
    loadComponent: () =>
      import('./pages/layout/main-layout/main-layout.component')
        .then((m) => m.MainLayoutComponent)
  },
];
