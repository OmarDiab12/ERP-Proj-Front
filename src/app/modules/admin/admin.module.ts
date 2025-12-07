import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ProjectsComponent } from './projects/projects.component';
import { ClientsComponent } from './clients/clients.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { BrokersComponent } from './brokers/brokers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AssetsComponent } from './assets/assets.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PartnersComponent } from './partners/partners.component';
import { RevenuesComponent } from './revenues/revenues.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { LoansComponent } from './loans/loans.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { FormModuleComponent } from 'src/app/shared/components/form-module/form-module.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { EmployeesComponent } from './employees/employees.component';
import { SharedUiModule } from 'src/app/shared/shared-ui.module';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AnalyticsComponent,
    ProjectsComponent,
    ClientsComponent,
    ContractorsComponent,
    BrokersComponent,
    SuppliersComponent,
    AssetsComponent,
    QuotesComponent,
    WarehouseComponent,
    InvoicesComponent,
    PartnersComponent,
    RevenuesComponent,
    CashflowComponent,
    LoansComponent,
    ExpensesComponent,
    SettingsComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedUiModule,
    AdminRoutingModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    ReactiveFormsModule,
    HttpClientModule,
    TabViewModule,
    ChartModule,
    CardModule,
    FormModuleComponent,
    ToastModule,
    ConfirmDialogModule,
    ProgressBarModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class AdminModule { }
