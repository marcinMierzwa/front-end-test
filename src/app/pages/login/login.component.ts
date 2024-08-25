import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router:Router = inject(Router)

  authService: AuthService = inject(AuthService);

  formBuilder: FormBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.nonNullable.group({
    email: [
      '',
      [Validators.required, Validators.maxLength(100), Validators.email],
    ],
    password: ['', [Validators.required, Validators.maxLength(100)]],

  });

  submit(): void {
    const loginFormData: LoginRequest = this.loginForm.getRawValue();
    this.authService
      .login(loginFormData)
      .subscribe({
        next: (res:LoginResponse) => {
        this.authService.accessToken.set(res.accessToken);
         this.router.navigateByUrl('/home');
        },
        error: (err) => console.log(err.error.message)
      });
  }

}
