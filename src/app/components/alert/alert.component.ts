import { Component, inject, OnInit, Signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ResendConfirmationEmail } from '../../models/resend-confirmation-email';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(): void {
    initFlowbite();
  }

  resendEmail() {
    const email = this.authService.registerResponseSuccess().email;
    const emailConfirmationToken = this.authService.registerResponseSuccess().emailConfirmationToken;

    this.authService
      .resendConfirmationEmail(email, emailConfirmationToken)
      .subscribe({
        next: (res: ResendConfirmationEmail) => {
          alert(res.message)
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}
