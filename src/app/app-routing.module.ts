import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'engineering-office',
    loadChildren: () => import('./modules/engineering-office/engineering-office.module').then(m => m.EngineeringOfficeModule)
  },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Redirect unknown routes to root which loads auth module (and then login)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
