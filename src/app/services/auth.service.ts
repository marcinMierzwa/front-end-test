import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterResponse } from '../models/reqister-response';
import { enviorment } from '../enviorments/enviorments.dev';
import { RegisterRequest } from '../models/register-request';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { LogoutResponse } from '../models/logout-response';
import { Router } from '@angular/router';
import { ResendConfirmationEmail } from '../models/resend-confirmation-email';
import { ForgotPasswordResponse } from '../models/forgot-password-response';
import { ResetPasswordResponse } from '../models/reset-password-response';
import { ChangePasswordResponse } from '../models/change-password-response';
import { ChangePasswordRequest } from '../models/change-password-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);

  router: Router = inject(Router);

  accessToken = signal<string>('');

  isLoggedIn = signal<boolean>(false);

  registerResponseSuccess = signal<RegisterResponse>({
    message: '',
    emailConfirmationToken: '',
    email: ''
  });

  isRegisterAlertVisible = signal<boolean>(false);

  // #register
  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${enviorment.api}auth/register`,
      registerRequest
    );
  }

  // #login
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${enviorment.api}auth/login`,
      loginRequest,
      { withCredentials: true }
    );
  }

  // #logout
  logout(): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(
      `${enviorment.api}auth/logout`,
      {},
      { withCredentials: true }
    );
  }

  // #refresh
  refresh(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${enviorment.api}auth/refresh`,
      {},
      { withCredentials: true }
    );
  }

  // #resend confirmation email
  resendConfirmationEmail(email?: string, emailConfirmationToken?: string): Observable<ResendConfirmationEmail> {
    return this.http.post<ResendConfirmationEmail>(
      `${enviorment.api}confirm/resend-confirmation-email`,
      { email, emailConfirmationToken }
    );
  }

  // #forgot email
  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${enviorment.api}reset/forgot-password`,
      { email }
    );
  }

  // #reset password
  resetPassword(
    newPassword: string,
    resetToken: string
  ): Observable<ResetPasswordResponse> {
    return this.http.put<ResetPasswordResponse>(
      `${enviorment.api}reset/reset-password`,
      { newPassword, resetToken }
    );
  }

  // #change password
  changePassword(formData: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this.http.put<ChangePasswordResponse>(`${enviorment.api}reset/change-password`, formData)
  }
}
