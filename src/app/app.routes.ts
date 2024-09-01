import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AlertLoginComponent } from './components/alert-login/alert-login.component';

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
      path: 'alert-login',
      component: AlertLoginComponent
    },

    { path: '**', redirectTo: 'home'}
  ];
  