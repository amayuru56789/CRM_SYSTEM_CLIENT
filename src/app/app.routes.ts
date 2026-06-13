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
  // {
  //   path: 'layout',
  //   loadComponent: () =>
  //     import('./pages/layout/main-layout/main-layout.component')
  //       .then((m) => m.MainLayoutComponent)
  // },
  // {
  //   path: 'dashboard',
  //   loadComponent: () =>
  //     import('./pages/dashboard/dashboard.component')
  //       .then((m) => m.DashboardComponent)
  // },
  // ── All protected pages INSIDE layout ────────────────
  {
    path:          '',
    // canActivate:   [authGuard],
    loadComponent: () =>
      import('./pages/layout/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    children: [
      {
        path:       '',
        redirectTo: 'dashboard',
        pathMatch:  'full'
      },
      {
        path:          'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path:          'customers',
        loadComponent: () =>
          import('./pages/customers/customer-list/customer-list.component')
            .then(m => m.CustomerListComponent)
      },
      // {
      //   path:          'customers/new',
      //   loadComponent: () =>
      //     import('./pages/post-login/customers/customer-form/customer-form.component')
      //       .then(m => m.CustomerFormComponent)
      // },
      // {
      //   path:          'customers/:id',
      //   loadComponent: () =>
      //     import('./pages/post-login/customers/customer-detail/customer-detail.component')
      //       .then(m => m.CustomerDetailComponent)
      // },
      // {
      //   path:          'customers/:id/edit',
      //   loadComponent: () =>
      //     import('./pages/post-login/customers/customer-form/customer-form.component')
      //       .then(m => m.CustomerFormComponent)
      // },
      // {
      //   path:          'leads',
      //   loadComponent: () =>
      //     import('./pages/post-login/leads/lead-list/lead-list.component')
      //       .then(m => m.LeadListComponent)
      // },
      // {
      //   path:          'deals',
      //   loadComponent: () =>
      //     import('./pages/post-login/deals/deal-pipeline/deal-pipeline.component')
      //       .then(m => m.DealPipelineComponent)
      // },
      // {
      //   path:          'interactions',
      //   loadComponent: () =>
      //     import('./pages/post-login/interactions/interaction-log/interaction-log.component')
      //       .then(m => m.InteractionLogComponent)
      // },
    ]
  },

  // ── Wildcard ─────────────────────────────────────────
  {
    path:       '**',
    redirectTo: 'auth/login'
  }
];
