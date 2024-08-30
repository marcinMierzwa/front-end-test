import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { StoreService } from '../../services/store.service';
import { RegisterResponse } from '../../models/reqister-response';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from "../../components/alert/alert.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, AlertComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  private readonly storeService: StoreService = inject(StoreService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  registerResponse: Signal<RegisterResponse> = this.authService.registrationResponse;
  


  ngOnInit(): void {
    this.storeService.getUser()
  }

  
}

