import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordResponse } from '../../models/forgot-password-response';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  formBulider:NonNullableFormBuilder = inject(NonNullableFormBuilder);

  router:Router = inject(Router);

  authService:AuthService = inject(AuthService);

  forgotPasswordForm = this.formBulider.group({
    email: ['']
  });

  submit() {
    const email = this.forgotPasswordForm.getRawValue().email;
    this.authService.forgotPassword(email).subscribe({
      next: (res: ForgotPasswordResponse) => {
        alert(res.message)
      },
      error: (err) => {
        alert(err.error.message)
      }
    });
  }

}
