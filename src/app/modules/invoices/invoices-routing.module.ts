import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: InvoicesComponent, data: { breadcrumb: 'الفواتير' } },
      { path: 'new', component: NewInvoiceComponent, data: { breadcrumb: 'فاتورة جديدة' } },
      { path: ':id', component: InvoiceDetailsComponent, data: { breadcrumb: 'تفاصيل الفاتورة' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
