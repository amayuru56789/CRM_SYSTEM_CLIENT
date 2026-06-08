import {Component, inject, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';

@Component({
  selector: 'app-main-layout.component',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {

  private breakpoint= inject(BreakpointObserver);
  private router= inject(Router);

  sidebarCollapsed = signal(false);
  mobileOpen       = signal(false);

  // Detect mobile
  isMobile = toSignal(
    this.breakpoint.observe([Breakpoints.Handset])
      .pipe(map(r => r.matches)),
    { initialValue: false }
  );

  // Derive page title from route
  pageTitle = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.getTitleFromUrl(this.router.url))
    ),
    { initialValue: this.getTitleFromUrl(this.router.url) }
  );

  toggleSidebar() {
    if (this.isMobile()) {
      this.mobileOpen.update(v => !v);
    } else {
      this.sidebarCollapsed.update(v => !v);
    }
  }

  private getTitleFromUrl(url: string): string {
    const segment = url.split('/')[1];
    const titles: Record<string, string> = {
      dashboard:    'Dashboard',
      customers:    'Customers',
      leads:        'Leads',
      deals:        'Deals',
      interactions: 'Interactions',
      reports:      'Reports',
      settings:     'Settings',
    };
    return titles[segment] ?? 'CRM Pro';
  }
}
