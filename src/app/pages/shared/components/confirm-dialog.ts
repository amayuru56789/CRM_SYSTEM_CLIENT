/**
 * @author amayuru_i
 * @project crm-frontend
 */
// src/app/shared/components/confirm-dialog/confirm-dialog.component.ts
import { Component, inject }   from '@angular/core';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA }     from '@angular/material/dialog';

export interface ConfirmDialogData {
  title:    string;
  message:  string;
  confirm:  string;
  cancel?:  string;
  danger?:  boolean;
  icon?:    string;
}

@Component({
  selector:   'app-confirm-dialog',
  standalone: true,
  imports:    [MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="dialog-wrapper">

      <!-- Icon -->
      <div class="dialog-icon"
           [class.danger]="data.danger">
        <mat-icon>{{ data.icon ?? (data.danger ? 'warning' : 'help_outline') }}</mat-icon>
      </div>

      <!-- Content -->
      <div class="dialog-content">
        <h2 mat-dialog-title>{{ data.title }}</h2>
        <p mat-dialog-content>{{ data.message }}</p>
      </div>

      <!-- Actions -->
      <mat-dialog-actions>
        <button mat-stroked-button
                (click)="dialogRef.close(false)">
          {{ data.cancel ?? 'Cancel' }}
        </button>
        <button mat-flat-button
                [color]="data.danger ? 'warn' : 'primary'"
                (click)="dialogRef.close(true)">
          {{ data.confirm }}
        </button>
      </mat-dialog-actions>

    </div>
  `,
  styles: [`
    .dialog-wrapper {
      padding:        24px;
      max-width:      400px;
      text-align:     center;
    }
    .dialog-icon {
      width:            64px;
      height:           64px;
      border-radius:    50%;
      background:       #e8f4ff;
      display:          flex;
      align-items:      center;
      justify-content:  center;
      margin:           0 auto 20px;

      mat-icon {
        font-size: 32px;
        width:     32px;
        height:    32px;
        color:     #1565c0;
      }

      &.danger {
        background: #fff0f0;
        mat-icon { color: #d32f2f; }
      }
    }
    h2 {
      font-family:   'Syne', sans-serif !important;
      font-size:     20px !important;
      font-weight:   700 !important;
      color:         #0f0f1a !important;
      margin-bottom: 8px !important;
    }
    p {
      font-size:   14px;
      color:       #666;
      line-height: 1.6;
      margin:      0;
      font-family: 'DM Sans', sans-serif;
    }
    mat-dialog-actions {
      display:         flex;
      justify-content: center !important;
      gap:             12px;
      margin-top:      24px !important;
      padding:         0   !important;

      button {
        min-width:     100px;
        border-radius: 8px !important;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  data      = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
