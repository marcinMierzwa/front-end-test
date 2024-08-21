import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(AuthService).accessToken();
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
});
  return next(newReq);
}