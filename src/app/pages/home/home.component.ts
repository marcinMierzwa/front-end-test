import { Component, inject, OnInit, Signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, AlertComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly storeService: StoreService = inject(StoreService);
  private readonly authService: AuthService = inject(AuthService);

  isRegisterAlertVisible: Signal<boolean> = this.authService.isRegisterAlertVisible;
  isLoginAlertVisible: Signal<boolean> = this.authService.isLoginAlertVisible;

  ngOnInit(): void {
    this.storeService.getUser();
    this.authService.getEmailToken().subscribe(
      (res)=> console.log(res)
      
    )
  }

}
