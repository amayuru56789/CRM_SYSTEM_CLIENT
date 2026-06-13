import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmDialogComponent, ConfirmDialogData} from '../../../pages/shared/components/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private dialog = inject(MatDialog);

  confirm(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data,
      width:        '400px',
      panelClass:   'confirm-dialog-panel',
      disableClose: true,
    }).afterClosed();
  }

  confirmDelete(itemName: string): Observable<boolean> {
    return this.confirm({
      title:   `Delete ${itemName}?`,
      message: `This action cannot be undone. ${itemName} will be permanently deleted.`,
      confirm: 'Delete',
      danger:  true,
      icon:    'delete_forever',
    });
  }
}
