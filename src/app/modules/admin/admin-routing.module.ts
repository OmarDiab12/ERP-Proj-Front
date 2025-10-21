import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent, // ⬅️ دا الـ Layout اللى فيه الـ navbar والـ sidebar
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: 'full' },
      // { path: 'dashboard', component: DashboardComponent , data: { breadcrumb: 'لوحة التحكم' }},
      { path: 'dashboard', component: DashboardComponent , data: { breadcrumb: 'لوحة التحكم' }},
      { path: 'analytics', component: AnalyticsComponent , data: { breadcrumb: 'التحليلات' }},
      { path: 'projects', component: ProjectsComponent , data: { breadcrumb: 'المشاريع' }},
      { path: 'clients', component: ClientsComponent , data: { breadcrumb: 'العملاء' }},
      { path: 'contractors', component: ContractorsComponent , data: { breadcrumb: 'المقاولون' }},
      { path: 'brokers', component: BrokersComponent , data: { breadcrumb: 'السماسرة' }},
      { path: 'suppliers', component: SuppliersComponent , data: { breadcrumb: 'الموردون' }},
      { path: 'assets', component: AssetsComponent , data: { breadcrumb: 'الأصول' }},
      { path: 'quotes', component: QuotesComponent , data: { breadcrumb: 'عروض الأسعار' }},
      { path: 'warehouse', component: WarehouseComponent , data: { breadcrumb: 'المخزون' }},
      { path: 'invoices', component: InvoicesComponent , data: { breadcrumb: 'الفواتير' }},
      { path: 'partners', component: PartnersComponent , data: { breadcrumb: 'الشركاء' }},
      { path: 'revenues', component: RevenuesComponent , data: { breadcrumb: 'الإيرادات' }},
      { path: 'cashflow', component: CashflowComponent , data: { breadcrumb: 'التدفق النقدي' }},
      { path: 'loans', component: LoansComponent , data: { breadcrumb: 'القروض الشخصية' }},
      { path: 'expenses', component: ExpensesComponent , data: { breadcrumb: 'المصروفات التشغيلية' }},
      { path: 'settings', component: SettingsComponent , data: { breadcrumb: 'الإعدادات' }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }







// const routes: Routes = [
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     data: { breadcrumb: 'لوحة التحكم' }
//   },
//   {
//     path: 'users',
//     data: { breadcrumb: 'المستخدمين' },
//     children: [
//       { path: '', component: UsersListComponent },
//       { path: ':id', component: UserDetailComponent, data: { breadcrumb: 'تفاصيل مستخدم' } }
//     ]
//   }
// ];
