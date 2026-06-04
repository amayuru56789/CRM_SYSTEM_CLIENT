import { CanActivateFn } from '@angular/router';
import {inject, PLATFORM_ID} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

// export const authGuard: CanActivateFn = (route, state) => {
//
//   const auth= inject(AuthService);
//   const router= inject(Router);
//
//   if (auth.isLoggedIn()) {
//     return true;
//   }
//
//   router.navigate(['/auth/login']);
//   return false;
// };

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ── On server always redirect to login ───────────────────
  if (!isPlatformBrowser(platformId)) {
    return router.createUrlTree(['/auth/login']);
  }

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
