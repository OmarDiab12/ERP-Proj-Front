import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedUiModule } from 'src/app/shared/shared-ui.module';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceDetailsComponent,
    NewInvoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SharedUiModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
