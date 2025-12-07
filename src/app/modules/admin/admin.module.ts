import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavBarComponent } from 'src/app/shared/components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { SideBarComponent } from 'src/app/shared/components/side-bar/side-bar.component';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
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
import { StepperComponent } from 'src/app/shared/components/stepper/stepper.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { EmployeesComponent } from './employees/employees.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLayoutComponent,
    NavBarComponent,
    SideBarComponent,
    NotificationComponent,
    BreadcrumbComponent,
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
    StepperComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule,
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
],providers: [ConfirmationService, MessageService],
})
export class AdminModule { }
