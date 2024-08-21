import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/reqister-response';
import { enviorment } from '../enviorments/enviorments.dev';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  http: HttpClient = inject(HttpClient);

  // #get user from data base
  getUser(): Observable<RegisterResponse> {
   return this.http.get<RegisterResponse>(`${enviorment.api}user`)
  }
}
