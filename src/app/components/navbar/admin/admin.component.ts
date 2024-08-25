import {
  Component,
  inject,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../services/auth.service';
import { StoreService } from '../../../services/store.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private storeService: StoreService = inject(StoreService);
  user: Signal<User> = this.storeService.user;

  ngOnInit(): void {
    initFlowbite();
  }

  logout(): void {
    this.authService.logout().subscribe();
    this.authService.isLoggedIn.set(false);
  }
}
