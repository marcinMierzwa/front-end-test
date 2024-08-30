import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/register-request';
import { RegisterResponse } from '../../models/reqister-response';
import { AlertComponent } from "../../components/alert/alert.component";


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  router:Router = inject(Router);

  authService: AuthService = inject(AuthService);

  formBuilder: FormBuilder = inject(FormBuilder);


  registerForm = this.formBuilder.nonNullable.group({
    email: [
      '',
      [Validators.required, Validators.maxLength(100), Validators.email],
    ],
    password: ['', [Validators.required, Validators.maxLength(100)]],
    confirmPassword: ['', [Validators.required, Validators.maxLength(100)]],

  });
  ngOnInit(): void {
  }

  submit(): void {
    const registerFormData: RegisterRequest = this.registerForm.getRawValue();
    this.authService.register(registerFormData)
      .subscribe({
        next: (response: RegisterResponse) => {
        this.authService.registrationResponse.set(response); 
        console.log(this.authService.registrationResponse());
         
        this.router.navigate(['/home']);
        },
        error: (err) => console.log(err.error.message)
      });
  }
}
