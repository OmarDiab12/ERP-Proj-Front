import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard } from './Core/gaurds/admin-auth.guard';
import { authGuard } from './Core/gaurds/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, adminAuthGuard],
    canActivateChild: [authGuard, adminAuthGuard],
    canLoad: [authGuard, adminAuthGuard],
    data: { roles: ['ADMIN'] },
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },

  {
    path: 'invoices',
    canActivate: [authGuard],
    canLoad: [authGuard],
    loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Redirect unknown routes to root which loads auth module (and then login)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
