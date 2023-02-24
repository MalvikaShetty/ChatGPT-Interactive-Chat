import { Routes } from '@angular/router';

export const full: Routes = [
  {
    path: 'error-page',
    loadChildren: () => import('../../pages/error/error.module').then(m => m.ErrorModule),
  },
  {
    path: 'authentication',
    loadChildren: () => import('../../pages/authentication/authentication.module').then(m => m.AuthenticationModule),
  },

];
