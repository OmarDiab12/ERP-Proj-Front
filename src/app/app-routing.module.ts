import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  // {
  //   path: 'admin',
  //   component: AdminLayoutComponent,
  //   canActivate: [adminAuthGuard],
  //   data: { roles: ['ADMIN'] },
  //   loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  // },
  {
    path: '',
    component: AdminLayoutComponent,
    // data: { roles: ['ADMIN'] },
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'notFoundPage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
