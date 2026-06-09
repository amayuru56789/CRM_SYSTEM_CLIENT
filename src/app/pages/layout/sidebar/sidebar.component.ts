import {Component, inject, input, output} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';
import {AuthService} from '../../../core/auth/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';

export interface NavItem {
  label:    string;
  icon:     string;
  route:    string;
  roles?:   string[];
  badge?:   number;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIcon,
    RouterLink,
    MatTooltip
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  collapsed= input<boolean>(false);
  closeSidebar= output<void>();

  private router= inject(Router);
  private authService= inject(AuthService);

  currentUser= this.authService.currentUser;

  // Track active route
  activeRoute= toSignal(
    this.router.events.pipe(
      filter(e=> e instanceof NavigationEnd),
      map(()=> this.router.url)
    ),
    { initialValue: this.router.url }
  );

  navItems: NavItem[] = [
    { label: 'Dashboard',    icon: 'dashboard',       route: '/dashboard'    },
    { label: 'Customers',    icon: 'people',          route: '/customers'    },
    { label: 'Leads',        icon: 'trending_up',     route: '/leads'        },
    { label: 'Deals',        icon: 'handshake',       route: '/deals'        },
    { label: 'Interactions', icon: 'forum',           route: '/interactions' },
    { label: 'Reports',      icon: 'bar_chart',       route: '/reports',
      roles: ['ADMIN', 'MANAGER'] },
    { label: 'Settings',     icon: 'settings',        route: '/settings',
      roles: ['ADMIN'] },
  ];

  isActive(route: string): boolean {
    return this.activeRoute()?.startsWith(route) ?? false;
  }

  canShow(item: NavItem): boolean {
    if (!item.roles) return true;
    return item.roles.includes(this.currentUser()?.role ?? '');
  }

  onNavClick() {
    // Close sidebar on mobile after navigation
    this.closeSidebar.emit();
  }

  logout() {
    this.authService.logout();
  }

  getInitials(): string {
    const name = this.currentUser()?.name ?? '';
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
