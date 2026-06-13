import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingSpinnerComponent} from '../../shared/components/loading-spinner';
import {PageHeaderComponent} from '../../shared/components/page-header';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-customer-detail.component',
  imports: [
    LoadingSpinnerComponent,
    PageHeaderComponent,
    NgClass,
    MatIcon
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
})
export class CustomerDetailComponent implements OnInit {

  private route           = inject(ActivatedRoute);
  private router          = inject(Router);
  // private customerService = inject(CustomerService);
  // private confirmDialog   = inject(ConfirmDialogService);
  private snackBar        = inject(MatSnackBar);

  // customer = signal<Customer | null>(null);
  loading  = signal(true);

  headerActions: any[] = [];

    ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id')!;
      this.load(id);
    }

  load(id: number) {
    this.loading.set(true);
    // this.customerService.getById(id).subscribe({
    //   next: (c) => {
    //     this.customer.set(c);
    //     this.headerActions = [
    //       { label: 'Edit', icon: 'edit', color: 'primary',
    //         route: `/customers/${c.id}/edit` }
    //     ];
    //     this.loading.set(false);
    //   },
    //   error: () => {
    //     this.snackBar.open('Customer not found', 'OK',
    //       { duration: 3000 });
    //     this.router.navigate(['/customers']);
    //   }
    // });
  }

  // initials(): string {
  //   // const c = this.customer()!;
  //   // return (c.firstName[0] + c.lastName[0]).toUpperCase();
  // }
  //
  // getStatusClass(): string {
  //   // return 'badge-' + (this.customer()?.status.toLowerCase() ?? '');
  // }

  delete() {
    // const c = this.customer()!;
    // this.confirmDialog.confirmDelete(c.fullName)
    //   .subscribe(confirmed => {
    //     if (!confirmed) return;
    //
    //     // this.customerService.delete(c.id).subscribe({
    //     //   next: () => {
    //     //     this.snackBar.open('Customer deleted', 'OK',
    //     //       { duration: 3000 });
    //     //     this.router.navigate(['/customers']);
    //     //   },
    //     //   error: (err) => {
    //     //     this.snackBar.open(
    //     //       err?.error?.message || 'Failed to delete customer',
    //     //       'OK', { duration: 4000 });
    //     //   }
    //     // });
    //   });
  }

}
