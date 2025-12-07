import { Component } from '@angular/core';

@Component({
  selector: 'app-add-supplier-shell',
  templateUrl: './add-supplier-shell.component.html',
  styleUrls: ['./add-supplier-shell.component.css']
})
export class AddSupplierShellComponent {
  steps = [
    { label: 'بيانات المورد', active: true },
    { label: 'التوريدات', active: false },
    { label: 'المرفقات', active: false }
  ];
}
