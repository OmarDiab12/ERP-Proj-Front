import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CardComponent } from './components/card/card.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavBarComponent,
    SideBarComponent,
    NotificationComponent,
    BreadcrumbComponent,
    PageHeaderComponent,
    CardComponent,
    CustomTableComponent,
    StepperComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    AdminLayoutComponent,
    NavBarComponent,
    SideBarComponent,
    NotificationComponent,
    BreadcrumbComponent,
    PageHeaderComponent,
    CardComponent,
    CustomTableComponent,
    StepperComponent
  ]
})
export class SharedUiModule { }
