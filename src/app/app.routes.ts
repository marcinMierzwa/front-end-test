import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
      {
        path: 'home',
        title: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((component) => component.HomeComponent),
      },
    {
      path: 'register',
      title: 'register',
      loadComponent: () =>
        import('./pages/register/register.component').then(
          (component) => component.RegisterComponent
        ),
    },
    {
      path: 'login',
      title: 'login',
        component: LoginComponent,
    },
    {
      path: 'forgot-password',
      title: 'forgot password',
      component: ForgotPasswordComponent
    },
    {
      path: 'reset-password',
      title: 'reset password',
      component: ResetPasswordComponent
    },
    {
      path: 'change-password',
      title: 'change password',
      component: ChangePasswordComponent
    },


    { path: '**', redirectTo: 'home'}
  ];
  