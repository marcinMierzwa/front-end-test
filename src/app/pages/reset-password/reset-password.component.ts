import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  authService: AuthService = inject(AuthService);

  router:Router = inject(Router);

  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  resetForm = this.formBuilder.group({
    newPassword: [''],
    confirmNewPassword: ['']
  })

  submit() {

  }

}
