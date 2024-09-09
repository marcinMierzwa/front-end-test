import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resend-confirmation-email',
  standalone: true,
  imports: [],
  templateUrl: './resend-confirmation-email.component.html',
  styleUrl: './resend-confirmation-email.component.css'
})
export class ResendConfirmationEmailComponent implements OnInit {
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.resendConfirmationEmail
  }


}
