import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NewSupplierPayload, SuppliersService } from '../../suppliers.service';

@Component({
  selector: 'app-add-supplier-shell',
  templateUrl: './add-supplier-shell.component.html',
  styleUrls: ['./add-supplier-shell.component.css']
})
export class AddSupplierShellComponent {
  constructor(
    private fb: FormBuilder,
    private suppliersService: SuppliersService,
    private messageService: MessageService,
    private router: Router
  ) {}

  form = this.fb.group({
    owner: ['', Validators.required],
    manager: ['', Validators.required],
    supplierName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    status: ['', Validators.required]
  });

  getControl(name: string) {
    return this.form.get(name);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as NewSupplierPayload;

    this.suppliersService.addSupplier(payload).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'تم الحفظ', detail: 'تم إضافة المورد بنجاح' });
      this.form.reset();
      this.router.navigate(['/admin/suppliers']);
    });
  }
}
