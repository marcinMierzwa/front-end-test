import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

  let refresh = false;
  export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authService = inject(AuthService);
  const authToken = authService.accessToken;


  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken()}`,
    },
  });
  return next(newReq).pipe(
    
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !refresh ) {
        refresh = true;
        return authService.refresh().pipe(
          switchMap((res) => {
            authToken.set(res.accessToken);
            return next(
              req.clone({
                setHeaders: {
                  Authorization: `Bearer ${authToken()}`,
                },
              })
            );
          })
        );
        
      }
      refresh = false;
      return throwError(() => error);
    })
    
  );
}
