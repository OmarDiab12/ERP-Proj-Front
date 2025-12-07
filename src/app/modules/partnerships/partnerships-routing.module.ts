import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnershipsComponent } from './partnerships.component';

const routes: Routes = [
  { path: '', component: PartnershipsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnershipsRoutingModule { }
