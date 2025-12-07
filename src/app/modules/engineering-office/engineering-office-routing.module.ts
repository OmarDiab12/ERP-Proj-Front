import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngineeringOfficeComponent } from './engineering-office.component';

const routes: Routes = [
  {
    path: '',
    component: EngineeringOfficeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineeringOfficeRoutingModule { }
