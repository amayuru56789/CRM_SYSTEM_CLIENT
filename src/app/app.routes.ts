import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    // Auth pages — no layout, no guard
    path: 'auth',
    loadChildren: () =>
      // import('./auth/auth.routes').then((m) => m.authRoutes),
      import('./pages/auth/auth-routing-module').then((m) => m.authRoutes),
  }
];
