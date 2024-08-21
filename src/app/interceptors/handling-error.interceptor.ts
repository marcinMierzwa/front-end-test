import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

export function handlingErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
const authService = inject(AuthService);
const authToken = inject(AuthService).accessToken;

  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (!req.url.includes('/login')) {
          return handle401Error(req, next);
        } else { 
          return throwError(() => error);
        } 
      }
      console.log("Failed to refresh token", error);
      authService.logout(); // log out user or handle error as needed 
      return throwError(() => error);
    })
    
  );


  
function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  return authService.refresh().pipe(
    switchMap(res => {
        authToken.set(res.accessToken);
        return next(req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken()}`,
          },
      })
      )

    })
    
  )

}



}
//   const authService: AuthService = inject(AuthService);
//   const isLoggedIn = authService.isLoggedIn;
//   if(isLoggedIn) {
//   const request = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${authService.accessToken()}`,
//     },
//   });
//   return next(request)
//   .pipe(
//     catchError((err: HttpErrorResponse) => {
//       if (err.status === 401) {
//         return authService.refresh().pipe(
//           switchMap((res) => {

//             authService.accessToken.set(res.accessToken);

//             return next(
//               req.clone({
//                 setHeaders: {
//                   Authorization: `Bearer ${authService.accessToken()}`,
//                 },
//               })
//             );
//           })
//         );
//       }
//       return throwError(() => err);
//     })
//   );
// };


// export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
//   // Inject the current `AuthService` and use it to get an authentication token:
//   const authToken = inject(AuthService).getAuthToken();
//   // Clone the request to add the authentication header.
//   const newReq = req.clone({
//     headers: req.headers.append('X-Authentication-Token', authToken),
//   });
//   return next(newReq);
// }