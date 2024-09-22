import {
  Component,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../services/auth.service';
import { StoreService } from '../../../services/store.service';
import { User } from '../../../models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private storeService: StoreService = inject(StoreService);
  private readonly router: Router = inject(Router);
  user: Signal<User> = this.storeService.user;

  ngOnInit(): void {
    initFlowbite();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
    this.authService.isLoggedIn.set(false);
  }
}
