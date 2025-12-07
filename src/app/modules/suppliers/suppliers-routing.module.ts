import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddSupplierShellComponent } from './views/add-supplier-shell/add-supplier-shell.component';
import { SuppliersComponent } from './views/suppliers/suppliers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SuppliersComponent, data: { breadcrumb: 'الموردون' } },
      { path: 'add', component: AddSupplierShellComponent, data: { breadcrumb: 'إضافة مورد جديد' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
