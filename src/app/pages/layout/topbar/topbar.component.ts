import {Component, inject, input, output} from '@angular/core';
import {AuthService} from '../../../core/auth/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatBadge} from '@angular/material/badge';
import {MatDivider} from '@angular/material/list';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-topbar.component',
  imports: [
    MatIcon,
    MatMenuTrigger,
    MatBadge,
    MatMenu,
    MatDivider,
    MatTooltip,
    MatMenuItem,
    RouterLink
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {

  toggleSidebar= output<void>();
  pageTitle= input<string>('Dashboard');

  private authService= inject(AuthService);
  currentUser= this.authService.currentUser;

  notifications = [
    { message: 'New lead assigned to you',    time: '5m ago',  read: false },
    { message: 'Deal "Acme Corp" moved to Won', time: '1h ago', read: false },
    { message: 'Follow-up reminder: TechCo',   time: '2h ago',  read: true  },
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getInitials(): string {
    const name = this.currentUser()?.name ?? '';
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  logout() { this.authService.logout(); }
}
