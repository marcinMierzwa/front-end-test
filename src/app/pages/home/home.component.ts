import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { StoreService } from '../../services/store.service';
import { RegisterResponse } from '../../models/reqister-response';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  message = 'Hello';

  storeService: StoreService = inject(StoreService);
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.storeService.getUser().subscribe({
      next: (response: RegisterResponse) => {
        
        this.message = `Hello ${response.email}`
      },
      error: (err) => {
        this.message = `${err.error.message}`
      }
    })

  }

}
