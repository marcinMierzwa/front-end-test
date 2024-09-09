import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const confirmationEmailInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const emailConfirmationToken = authService.emailConfirmationToken;


  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${emailConfirmationToken()}`,
    },
  });
  return next(newReq);
};
