import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageHeaderComponent} from '../../shared/components/page-header';
import {LoadingSpinnerComponent} from '../../shared/components/loading-spinner';
import {MatError, MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {CustomerService} from '../../../core/services/customer/customer.service';
import {CustomerRequest} from '../../../core/models/customer';

@Component({
  selector: 'app-customer-form',
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatSelect,
    MatOption,
    MatIcon
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent implements OnInit {

  private fb      = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router= inject(Router);
  private customerService = inject(CustomerService);
  private snackBar= inject(MatSnackBar);

  form = this.fb.group({
    firstName:  ['', [Validators.required, Validators.maxLength(100)]],
    lastName:   ['', [Validators.required, Validators.maxLength(100)]],
    email:      ['', [Validators.email]],
    phone:      [''],
    company:    [''],
    industry:   [''],
    status:     ['PROSPECT'],
    notes:      [''],
    assignedTo: [null as number | null],
  });

  isEdit     = signal(false);
  saving     = signal(false);
  pageLoading = signal(false);
  private customerId: number | null = null;

  industries = [
    'Technology', 'Finance', 'Healthcare', 'Retail',
    'Manufacturing', 'Education', 'Other'
  ];

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id && id !== 'new') {
        this.isEdit.set(true);
        this.customerId = +id;
        this.loadCustomer(this.customerId);
      }
    }

  loadCustomer(id: number) {
    this.pageLoading.set(true);
    this.customerService.getById(id).subscribe({
      next: (c) => {
        this.form.patchValue({
          firstName:  c.firstName,
          lastName:   c.lastName,
          email:      c.email,
          phone:      c.phone,
          company:    c.company,
          industry:   c.industry,
          status:     c.status,
          notes:      c.notes,
          assignedTo: c.assignedToId,
        });
        this.pageLoading.set(false);
      },
      error: () => {
        this.snackBar.open('Failed to load customer', 'OK',
          { duration: 3000 });
        this.pageLoading.set(false);
        this.router.navigate(['/customers']);
      }
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const request = this.form.value as CustomerRequest;

    const action$ = this.isEdit()
      ? this.customerService.update(this.customerId!, request)
      : this.customerService.create(request);

    action$.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEdit()
            ? 'Customer updated successfully'
            : 'Customer created successfully',
          'OK', { duration: 3000 });
        this.router.navigate(['/customers']);
      },
      error: (err) => {
        this.snackBar.open(
          err?.error?.message || 'Something went wrong',
          'OK', { duration: 4000 });
        this.saving.set(false);
      }
    });
  }

}
