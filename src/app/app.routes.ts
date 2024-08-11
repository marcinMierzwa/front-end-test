import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
    },
      {
        path: '/home',
        title: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((component) => component.HomeComponent),
      },
    {
      path: '/register',
      title: 'register',
      loadComponent: () =>
        import('./pages/register/register.component').then(
          (component) => component.RegisterComponent
        ),
    },
    {
      path: '/login',
      title: 'login',
      loadComponent: () =>
        import('./pages/login/login.component').then(
          (component) => component.LoginComponent
        ),
    },
    { path: '**', redirectTo: 'home'}
  ];
  