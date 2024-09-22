import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ChangePasswordResponse } from '../../models/change-password-response';
import { ChangePasswordRequest } from '../../models/change-password-request';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  changeForm: FormGroup = this.formBuilder.group({
    oldPassword: '',
    newPassword: '',
})

submit(): void{
  const changeFormData: ChangePasswordRequest = this.changeForm.getRawValue();
  this.authService.changePassword(changeFormData).subscribe({
    next: (res: ChangePasswordResponse) => {
      console.log(res);
      
    },
    error: (err) => {
      console.log(err.error.message);
      
    }
  })
}
}
