import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EngineeringOfficeComponent } from './engineering-office.component';
import { EngineeringOfficeRoutingModule } from './engineering-office-routing.module';

@NgModule({
  declarations: [EngineeringOfficeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EngineeringOfficeRoutingModule
  ]
})
export class EngineeringOfficeModule { }
