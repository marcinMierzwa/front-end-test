import { Component, inject, OnInit, Signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {


  private readonly authService: AuthService = inject(AuthService);

  registerAlertMessageSuccess: Signal<string> = this.authService.registerAlertMessageSuccess;
  loginAlertMessageSuccess: Signal<string> = this.authService.loginAlertMessageSuccess;

  ngOnInit(): void {
    initFlowbite();
  }

  closeAlert() {
    this.authService.isLoginAlertVisible.set(false);
  }  


}
