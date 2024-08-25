import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { StoreService } from '../../services/store.service';
import { RegisterResponse } from '../../models/reqister-response';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  storeService: StoreService = inject(StoreService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.storeService.getUser()
  }

  
}

