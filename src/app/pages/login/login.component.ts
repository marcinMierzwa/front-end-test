import { Component, inject, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';
import { AlertComponent } from "../../components/alert/alert.component";
import { NgClass } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AlertComponent, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router:Router = inject(Router)

  authService: AuthService = inject(AuthService);

  formBuilder: FormBuilder = inject(FormBuilder);

  isLoginAlertVisible: Signal<boolean> = this.authService.isLoginAlertVisible;


  loginForm = this.formBuilder.nonNullable.group({
    email: [
      '',
      [Validators.required, Validators.maxLength(100), Validators.email],
    ],
    password: ['', [Validators.required, Validators.maxLength(100)]],

  });

  ngOnInit(): void {
    initFlowbite();
  }
    

  submit(): void {
    const loginFormData: LoginRequest = this.loginForm.getRawValue();
    this.authService
      .login(loginFormData)
      .subscribe({
        next: (res:LoginResponse) => {
        this.authService.accessToken.set(res.accessToken);
        this.router.navigateByUrl('/home');
        this.authService.isLoginAlertVisible.set(true);
        this.authService.loginAlertMessageSuccess.set(res.message);
        this.authService.moveLoginAlert();

        },
        error: (err) => {
          console.log(err)
          this.authService.isLoginAlertVisible.set(true);
          this.authService.loginAlertMessageError.set(err.error.message);
        
        }
      });
  }

}
