import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth    = inject(AuthService);
  const router        = inject(Router);
  const requiredRoles = route.data['roles'] as string[];

  if (requiredRoles.includes(auth.currentUser()?.role ?? '')) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
