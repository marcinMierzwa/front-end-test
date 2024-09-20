import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

  private authService: AuthService = inject(AuthService);

  private router:Router = inject(Router);

  private route:ActivatedRoute = inject(ActivatedRoute);

  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  resetForm = this.formBuilder.group({
    newPassword: [''],
  });

  resetToken = toSignal(this.route.queryParamMap
    .pipe(
      map(params => params.get('token'))
    ),{initialValue: ''});
   
  ngOnInit(): void {}

  submit() {
    const newPassword = this.resetForm.getRawValue().newPassword;
    this.authService.resetPassword(newPassword, this.resetToken()!)
    .subscribe({
      next: (res) => {
        alert(res.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.message);
        this.router.navigate(['/forgot-password']);
      }
    });
    
  }

}
