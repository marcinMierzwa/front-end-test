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
import { loginAlertError } from '../models/login-alert-error';
import { ResendConfirmationEmail } from '../models/resend-confirmation-email';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


http: HttpClient = inject(HttpClient);

router: Router = inject(Router);

accessToken = signal<string>('');

isLoggedIn = signal<boolean>(false);

registerResponseSuccess = signal<RegisterResponse>({
  message: 'fd',
  email: ''
});

isRegisterAlertVisible = signal<boolean>(false);




// #register
register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
 return this.http.post<RegisterResponse>(`${enviorment.api}auth/register`, registerRequest)
}

// #login
login(loginRequest: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${enviorment.api}auth/login`, loginRequest, {withCredentials: true})
  
}

// #logout
logout(): Observable<LogoutResponse> {
  return this.http.post<LogoutResponse>(`${enviorment.api}auth/logout`, {}, {withCredentials: true})
}

// #refresh
refresh(): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${enviorment.api}auth/refresh`, {}, {withCredentials: true})
}

// #resend confirmation email
resendConfirmationEmail(email?: string): Observable<ResendConfirmationEmail> {
  return this.http.post<ResendConfirmationEmail>(`${enviorment.api}mail/resend-confirmation-email`, {email});
}





}
