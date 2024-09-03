import { Component, inject, input, OnInit, Signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RegisterResponse } from '../../models/reqister-response';
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

  registerAlertMessage: Signal<RegisterResponse> = this.authService.registrationResponse;
  loginAlertMessageSuccess: Signal<string> = this.authService.loginAlertMessageSuccess;
  loginAlertMessageError: Signal<string> = this.authService.loginAlertMessageError;

  ngOnInit(): void {
    initFlowbite();
  }


}
