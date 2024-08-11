import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterResponse } from '../models/reqister-response';
import { enviorment } from '../enviorments/enviorments.dev';
import { RegisterRequest } from '../models/register-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

http: HttpClient = inject(HttpClient);

// #register
register(registerFormData: RegisterRequest): Observable<RegisterResponse> {
  return this.http.post<RegisterResponse>(`${enviorment.api}/register`, registerFormData)
}

}
