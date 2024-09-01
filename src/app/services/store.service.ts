import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/reqister-response';
import { enviorment } from '../enviorments/enviorments.dev';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private http: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  user = signal<User>({
    email: '',
    id: '',
    isEmailAdressConfirmed: false
  });


  // #get user from data base
  getUser() {
   this.http.get<User>(`${enviorment.api}user`).subscribe({
    next: (response: User) => {
      this.user.set(response);
      this.authService.isLoggedIn.set(true);
    },
    error: (err) => {
      console.log(err);
      ;
    }
  })
  }
}
