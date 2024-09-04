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
import { EmailConfirmation } from '../models/email-confirmartion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


http: HttpClient = inject(HttpClient);

router: Router = inject(Router);

accessToken = signal<string>('');

isLoggedIn = signal<boolean>(false);

isRegisterAlertVisible = signal<boolean>(false);

isLoginAlertVisible = signal<boolean>(false);


registerAlertMessageError = signal<string>('');
registerAlertMessageSuccess = signal<string>('');
loginAlertMessageError = signal<string>('');
loginAlertMessageSuccess = signal<string>('');


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

// // #check email confirmation adress
// checkEmailConfiramtion(): Observable<EmailConfirmation> {
//   return this.http.get<EmailConfirmation>(`${enviorment.api}/mail)
// }

moveRegisterAlert() {
  setTimeout(() => {
    this.isRegisterAlertVisible.set(true);
  },2500)
  setTimeout(() => {
    this.isRegisterAlertVisible.set(false);
  },15000)
}


}
