import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { PartnershipsRoutingModule } from './partnerships-routing.module';
import { PartnershipsComponent } from './partnerships.component';

@NgModule({
  declarations: [PartnershipsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    PartnershipsRoutingModule
  ]
})
export class PartnershipsModule { }
