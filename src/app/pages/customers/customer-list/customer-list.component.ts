import {Component, inject, OnInit, signal} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {DataTableComponent, TableAction, TableColumn} from '../../shared/components/data-table';
import {PageHeaderComponent} from '../../shared/components/page-header';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {LoadingSpinnerComponent} from '../../shared/components/loading-spinner';
import {CustomerService} from '../../../core/services/customer/customer.service';
import {Customer, CustomerStatus} from '../../../core/models/customer';
import {ConfirmDialogService} from '../../../core/services/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-customer-list',
  imports: [
    PageHeaderComponent,
    MatFormField,
    MatIcon,
    FormsModule,
    MatSelect,
    MatOption,
    LoadingSpinnerComponent,
    DataTableComponent,
    MatInput
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit {

  private customerService = inject(CustomerService);
  private confirmDialog   = inject(ConfirmDialogService);
  private snackBar= inject(MatSnackBar);
  private router= inject(Router);

  // ── State ─────────────────────────────────────────────
  customers= signal<Customer[]>([]);
  totalElements= signal(0);
  loading= signal(true);

  searchTerm = '';
  selectedStatus: CustomerStatus | null = null;
  page     = 0;
  pageSize = 10;

  private searchSubject = new Subject<string>();

  // ── Page header actions ───────────────────────────────
  headerActions = [
    { label: 'Add Customer', icon: 'add',
      color: 'primary' as const, route: '/customers/new' }
  ];

  // ── Table config ──────────────────────────────────────
  columns: TableColumn[] = [
    { key: 'fullName', label: 'Name',    type: 'avatar' },
    { key: 'company',  label: 'Company' },
    { key: 'phone',    label: 'Phone'   },
    {
      key: 'status', label: 'Status', type: 'badge',
      badgeClass: (v: string) => 'badge-' + v.toLowerCase()
    },
    { key: 'assignedToName', label: 'Assigned To' },
  ];

  tableActions: TableAction[] = [
    { label: 'View',   icon: 'visibility' },
    { label: 'Edit',   icon: 'edit'       },
    { label: 'Delete', icon: 'delete', color: 'warn' },
  ];

    ngOnInit(): void {
      this.searchSubject.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(() => this.load());

      this.load();
    }

  load() {
    this.loading.set(true);
    this.customerService.getAll({
      search:     this.searchTerm     || undefined,
      status:     this.selectedStatus || undefined,
      page:       this.page,
      size:       this.pageSize
    }).subscribe({
      next: (res) => {
        this.customers.set(res.content);
        this.totalElements.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Failed to load customers', 'OK',
          { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.searchSubject.next(value);
  }

  onFilterChange() {
    this.page = 0;
    this.load();
  }

  onPageChange(e: { pageIndex: number; pageSize: number }) {
    this.page     = e.pageIndex;
    this.pageSize = e.pageSize;
    this.load();
  }

  onRowClick(customer: Customer) {
    this.router.navigate(['/customers', customer.id]);
  }

  onAction(event: { action: string; row: Customer }) {
    const { action, row } = event;

    switch (action) {
      case 'View':
        this.router.navigate(['/customers', row.id]);
        break;

      case 'Edit':
        this.router.navigate(['/customers', row.id, 'edit']);
        break;

      case 'Delete':
        this.deleteCustomer(row);
        break;
    }
  }

  deleteCustomer(customer: Customer) {
    this.confirmDialog.confirmDelete(customer.fullName)
      .subscribe(confirmed => {
        if (!confirmed) return;

        this.customerService.delete(customer.id).subscribe({
          next: () => {
            this.snackBar.open(
              'Customer deleted successfully', 'OK',
              { duration: 3000 });
            this.load();
          },
          error: (err) => {
            this.snackBar.open(
              err?.error?.message || 'Failed to delete customer',
              'OK', { duration: 4000 });
          }
        });
      });
  }

}
