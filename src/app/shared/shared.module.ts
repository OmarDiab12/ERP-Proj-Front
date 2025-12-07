import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CardComponent } from './components/card/card.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    CardComponent,
    CustomTableComponent
  ],
  imports: [CommonModule],
  exports: [
    PageHeaderComponent,
    CardComponent,
    CustomTableComponent
  ]
})
export class SharedModule {}
