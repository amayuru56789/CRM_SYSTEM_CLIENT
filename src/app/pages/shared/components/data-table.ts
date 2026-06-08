/**
 * @author amayuru_i
 * @project crm-frontend
 */
// src/app/shared/components/data-table/data-table.component.ts
import { Component, input, output } from '@angular/core';
import { CommonModule }             from '@angular/common';
import { MatTableModule }           from '@angular/material/table';
import { MatPaginatorModule,
  PageEvent }                from '@angular/material/paginator';
import { MatSortModule }            from '@angular/material/sort';
import { MatIconModule }            from '@angular/material/icon';
import { MatButtonModule }          from '@angular/material/button';
import { MatMenuModule }            from '@angular/material/menu';
import { MatChipsModule }           from '@angular/material/chips';
import { RouterModule }             from '@angular/router';

export interface TableColumn {
  key:        string;
  label:      string;
  type?:      'text' | 'badge' | 'date' | 'currency' | 'avatar';
  badgeClass?: (value: string) => string;
  sortable?:  boolean;
  width?:     string;
}

export interface TableAction {
  label:  string;
  icon:   string;
  color?: string;
}

@Component({
  selector:   'app-data-table',
  standalone: true,
  imports:    [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatChipsModule,
  ],
  template: `
    <div class="table-card">

      <!-- Table -->
      <div class="table-scroll">
        <table mat-table [dataSource]="data()">

          @for (col of columns(); track col.key) {
            <ng-container [matColumnDef]="col.key">
              <th mat-header-cell *matHeaderCellDef
                  [style.width]="col.width">
                {{ col.label }}
              </th>
              <td mat-cell *matCellDef="let row">

                @switch (col.type) {

                  @case ('avatar') {
                    <div class="cell-avatar">
                      <div class="avatar">
                        {{ getInitials(row[col.key]) }}
                      </div>
                      <span>{{ row[col.key] }}</span>
                    </div>
                  }

                  @case ('badge') {
                    <span class="badge"
                          [ngClass]="col.badgeClass?.(row[col.key]) ?? ''">
                      {{ row[col.key] }}
                    </span>
                  }

                  @case ('date') {
                    {{ row[col.key] | date:'mediumDate' }}
                  }

                  @case ('currency') {
                    {{ row[col.key] | currency:'USD':'symbol':'1.0-0' }}
                  }

                  @default {
                    {{ row[col.key] ?? '—' }}
                  }
                }

              </td>
            </ng-container>
          }

          <!-- Actions column -->
          @if (actions().length > 0) {
            <ng-container matColumnDef="__actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let row">
                <button mat-icon-button
                        [matMenuTriggerFor]="rowMenu"
                        (click)="$event.stopPropagation()">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #rowMenu="matMenu">
                  @for (action of actions(); track action.label) {
                    <button mat-menu-item
                            [class.action-danger]="action.color === 'warn'"
                            (click)="actionClick.emit({ action: action.label, row })">
                      <mat-icon [style.color]="action.color === 'warn'
                                ? '#d32f2f' : ''">
                        {{ action.icon }}
                      </mat-icon>
                      {{ action.label }}
                    </button>
                  }
                </mat-menu>
              </td>
            </ng-container>
          }

          <tr mat-header-row
              *matHeaderRowDef="displayedColumns()"></tr>
          <tr mat-row
              *matRowDef="let row; columns: displayedColumns();"
              class="table-row"
              (click)="rowClick.emit(row)"></tr>

          <!-- Empty state -->
          <tr class="mat-row" *matNoDataRow>
            <td class="empty-state"
                [attr.colspan]="displayedColumns().length">
              <mat-icon>inbox</mat-icon>
              <p>{{ emptyMessage() }}</p>
            </td>
          </tr>

        </table>
      </div>

      <!-- Paginator -->
      @if (showPaginator()) {
        <mat-paginator
          [length]="total()"
          [pageSize]="pageSize()"
          [pageSizeOptions]="[5, 10, 25, 50]"
          (page)="pageChange.emit($event)"
          showFirstLastButtons/>
      }

    </div>
  `,
  styles: [`
    .table-card {
      background:    #fff;
      border-radius: 12px;
      border:        1px solid #eee;
      overflow:      hidden;
    }
    .table-scroll { overflow-x: auto; }
    table         { width: 100%; }
    th.mat-header-cell {
      font-size:      12px;
      font-weight:    600;
      color:          #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family:    'DM Sans', sans-serif;
      border-bottom:  1px solid #f0f0f0 !important;
      padding:        14px 16px !important;
    }
    td.mat-cell {
      font-size:     13px;
      color:         #333;
      font-family:   'DM Sans', sans-serif;
      padding:       12px 16px !important;
      border-bottom: 1px solid #f9f9f9 !important;
    }
    .table-row {
      cursor:     pointer;
      transition: background 0.15s;
      &:hover { background: #fafafa; }
      &:last-child td { border-bottom: none !important; }
    }
    .cell-avatar {
      display:     flex;
      align-items: center;
      gap:         10px;
      font-weight: 500;
    }
    .avatar {
      width:            34px;
      height:           34px;
      border-radius:    50%;
      background:       #6c63ff;
      color:            #fff;
      display:          flex;
      align-items:      center;
      justify-content:  center;
      font-size:        12px;
      font-weight:      600;
      flex-shrink:      0;
    }
    .badge {
      padding:       3px 10px;
      border-radius: 20px;
      font-size:     12px;
      font-weight:   500;
    }
    .empty-state {
      text-align:  center;
      padding:     56px 24px !important;
      color:       #bbb;
      mat-icon {
        font-size:   48px;
        width:       48px;
        height:      48px;
        display:     block;
        margin:      0 auto 12px;
      }
      p {
        margin:      0;
        font-size:   14px;
        font-family: 'DM Sans', sans-serif;
      }
    }
    .action-danger { color: #d32f2f; }
  `]
})
export class DataTableComponent {
  columns      = input.required<TableColumn[]>();
  data         = input.required<any[]>();
  actions      = input<TableAction[]>([]);
  total        = input<number>(0);
  pageSize     = input<number>(10);
  showPaginator = input<boolean>(true);
  emptyMessage = input<string>('No records found');

  rowClick    = output<any>();
  actionClick = output<{ action: string; row: any }>();
  pageChange  = output<PageEvent>();

  displayedColumns() {
    const cols = this.columns().map(c => c.key);
    if (this.actions().length > 0) cols.push('__actions');
    return cols;
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
