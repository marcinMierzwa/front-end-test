import { Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/register-request';
import { RegisterResponse } from '../../models/reqister-response';
import { AlertComponent } from '../../components/alert/alert.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AlertComponent, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  router: Router = inject(Router);

  authService: AuthService = inject(AuthService);

  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  registerForm = this.formBuilder.group({
    email: this.formBuilder.control ('',{validators: [Validators.required, Validators.maxLength(100), Validators.email]}),
    password: this.formBuilder.control ('',{validators: [Validators.required, Validators.maxLength(100)]}),
    confirmPassword: this.formBuilder.control ('',{validators: [Validators.required, Validators.maxLength(100)]}),
  });

  ngOnInit(): void {}

  submit(): void {
    const registerFormData: RegisterRequest  = this.registerForm.getRawValue();
    this.authService.register(registerFormData).subscribe({
      next: (response: RegisterResponse) => {
        this.router.navigate(['/home']);
        this.authService.registerAlertMessageSuccess.set(response.message);
        this.authService.moveRegisterAlert();
      },

      error: (err) => {
        console.log(err.error.message);
        this.authService.registerAlertMessageError.set(err.error.message);
      },
    });
  }
}
