import {Injectable, signal, PLATFORM_ID, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'SALES_REP';
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly TOKEN_KEY = 'crm_token';
  private readonly USER_KEY  = 'crm_user';

  // Angular 17 signals for reactive auth state
  currentUser = signal<AuthUser | null>(null);
  isLoggedIn  = signal<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router, @Inject(PLATFORM_ID)
              private platformId: object) {
    // ── Only access localStorage in browser ─────────────────
    if (this.isBrowser()) {
      const user  = this.loadUser();
      const token = this.loadToken();
      this.currentUser.set(user);
      this.isLoggedIn.set(!!token);
    }
  }

  login(email: string, password: string) {
    console.log(email, password, 'print all')
    return this.http.post<AuthUser>(
      `${environment.apiUrl}/auth/login`,
      { email, password }
    ).pipe(
      tap(user => this.setSession(user))
    );
  }

  register(name: string, email: string, password: string, role: string) {
    return this.http.post<AuthUser>(
      `${environment.apiUrl}/auth/register`,
      { name, email, password, role }
    ).pipe(
      tap(user => this.setSession(user))
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    // this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }

  private setSession(user: AuthUser) {
    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, user.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
  }

  private loadToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private loadUser(): AuthUser | null {
    if (!this.isBrowser()) return null;
    const u = localStorage.getItem(this.USER_KEY);
    return u ? JSON.parse(u) : null;
  }
  // ── Browser check ────────────────────────────────────────
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
