import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { AddSupplierShellComponent } from './views/add-supplier-shell/add-supplier-shell.component';
import { SuppliersComponent } from './views/suppliers/suppliers.component';

@NgModule({
  declarations: [SuppliersComponent, AddSupplierShellComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ToastModule, SuppliersRoutingModule],
  providers: [MessageService]
})
export class SuppliersModule {}
