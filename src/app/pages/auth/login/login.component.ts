import {Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/auth.service';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/input';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login.component',
  imports: [
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatError,
    MatProgressSpinner,
    MatCardActions,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  form: FormGroup;
  loading = signal(false);
  errorMessage= signal('');
  showPassword= signal(false);

  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email()    { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  togglePassword() { this.showPassword.update(v => !v); }

  onSubmit() {
    console.log('call sub')
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login(
      this.email.value,
      this.password.value
    ).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
        // this.router.navigate(['/layout']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(
          err?.error?.message || 'Invalid email or password'
        );
      }
    });
  }
}
