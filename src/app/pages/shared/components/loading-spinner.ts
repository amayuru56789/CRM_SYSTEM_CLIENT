/**
 * @author amayuru_i
 * @project crm-frontend
 */
// src/app/shared/components/loading-spinner/loading-spinner.component.ts
import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector:   'app-loading-spinner',
  standalone: true,
  imports:    [MatProgressSpinnerModule],
  template: `
    <div class="spinner-wrapper"
         [class.overlay]="overlay()"
         [class.inline]="!overlay()">
      <div class="spinner-box">
        <mat-spinner [diameter]="size()"/>
        @if (message()) {
          <p class="spinner-msg">{{ message() }}</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .spinner-wrapper {
      display:          flex;
      align-items:      center;
      justify-content:  center;
    }
    .overlay {
      position:   fixed;
      inset:      0;
      background: rgba(255,255,255,0.8);
      z-index:    9999;
    }
    .inline {
      padding: 48px 24px;
      width:   100%;
    }
    .spinner-box {
      display:        flex;
      flex-direction: column;
      align-items:    center;
      gap:            16px;
    }
    .spinner-msg {
      font-size:   14px;
      color:       #888;
      margin:      0;
      font-family: 'DM Sans', sans-serif;
    }
  `]
})
export class LoadingSpinnerComponent {
  overlay = input<boolean>(false);
  size    = input<number>(40);
  message = input<string>('');
}
