import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from './auth.service';
import {inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  // ── Only add token in browser ────────────────────────────
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const token = auth.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
