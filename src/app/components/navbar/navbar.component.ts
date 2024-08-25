import { Component, inject, input, OnInit, signal } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from "./admin/admin.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AuthComponent, AdminComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent  {

  authService: AuthService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn();
}
