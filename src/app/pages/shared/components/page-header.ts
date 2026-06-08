/**
 * @author amayuru_i
 * @project crm-frontend
 */
import { Component, input, output } from '@angular/core';
import { MatButtonModule }          from '@angular/material/button';
import { MatIconModule }            from '@angular/material/icon';
import { RouterModule }             from '@angular/router';

export interface PageAction {
  label:   string;
  icon?:   string;
  color?:  'primary' | 'accent' | 'warn';
  route?:  string;
}

@Component({
  selector:   'app-page-header',
  standalone: true,
  imports:    [MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="page-header">
      <div class="header-left">

        @if (backRoute()) {
          <a class="back-btn"
             [routerLink]="backRoute()">
            <mat-icon>arrow_back</mat-icon>
          </a>
        }

        <div class="header-text">
          <h1 class="header-title">{{ title() }}</h1>
          @if (subtitle()) {
            <p class="header-subtitle">{{ subtitle() }}</p>
          }
        </div>

      </div>

      <div class="header-actions">
        @for (action of actions(); track action.label) {
          @if (action.route) {
            <a mat-flat-button
               [color]="action.color ?? 'primary'"
               [routerLink]="action.route"
               class="action-btn">
              @if (action.icon) {
                <mat-icon>{{ action.icon }}</mat-icon>
              }
              {{ action.label }}
            </a>
          } @else {
            <button mat-flat-button
                    [color]="action.color ?? 'primary'"
                    (click)="actionClick.emit(action.label)"
                    class="action-btn">
              @if (action.icon) {
                <mat-icon>{{ action.icon }}</mat-icon>
              }
              {{ action.label }}
            </button>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display:         flex;
      align-items:     flex-start;
      justify-content: space-between;
      margin-bottom:   24px;
      flex-wrap:       wrap;
      gap:             16px;
    }
    .header-left {
      display:     flex;
      align-items: center;
      gap:         12px;
    }
    .back-btn {
      display:         flex;
      align-items:     center;
      justify-content: center;
      width:           36px;
      height:          36px;
      border-radius:   8px;
      color:           #555;
      text-decoration: none;
      transition:      background 0.2s;
      &:hover { background: #f0f0f0; }
      mat-icon { font-size: 20px; }
    }
    .header-title {
      font-family: 'Syne', sans-serif;
      font-size:   24px;
      font-weight: 700;
      color:       #0f0f1a;
      margin:      0 0 4px;
    }
    .header-subtitle {
      font-size:   14px;
      color:       #888;
      margin:      0;
      font-family: 'DM Sans', sans-serif;
    }
    .header-actions {
      display:     flex;
      gap:         8px;
      flex-wrap:   wrap;
      align-items: center;
    }
    .action-btn {
      border-radius: 8px !important;
      font-family:   'DM Sans', sans-serif !important;
      font-weight:   500 !important;
    }
  `]
})
export class PageHeaderComponent {
  title     = input.required<string>();
  subtitle  = input<string>('');
  backRoute = input<string>('');
  actions   = input<PageAction[]>([]);

  actionClick = output<string>();
}
