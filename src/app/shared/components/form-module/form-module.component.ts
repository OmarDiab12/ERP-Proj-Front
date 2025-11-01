import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface FormField {
  name: string;
  label?: string;
  type?: string; // text, number, email, date, select, textarea, file
  placeholder?: string;
  required?: boolean;
  options?: { value: any, label: string }[];
  rowGroup?: FormField[]; // ✅ لتجميع حقلين في صف واحد
}

@Component({
  selector: 'app-form-module',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-module.component.html',
  styleUrls: ['./form-module.component.css']
})
export class FormModuleComponent implements OnInit {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() fields: FormField[] = [];
  @Input() submitText: string = 'حفظ';
  @Input() formData: any = null;
  @Input() disabledFields: string[] = [];
  @Input() showImageUpload: boolean = false; // ✅ عشان نتحكم في ظهور رفع الصورة
  @Input() circleIcon: string='user-plus'; // ✅ عشان نتحكم في ظهور رفع الصورة
  @Input() personImageLabel: string='الشخص'; // ✅ عشان نتحكم في ظهور رفع الصورة

  @Output() cancel = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  isEditMode: boolean = false;
  previewUrl: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isEditMode = !!this.formData;
    const group: any = {};

    this.fields.forEach(field => {
      if (field.rowGroup) {
        field.rowGroup.forEach(sub => {
          group[sub.name!] = sub.required
            ? [this.formData ? this.formData[sub.name!] : '', Validators.required]
            : [this.formData ? this.formData[sub.name!] : ''];
        });
      } else {
        group[field.name!] = field.required
          ? [this.formData ? this.formData[field.name!] : '', Validators.required]
          : [this.formData ? this.formData[field.name!] : ''];
      }
    });

    this.form = this.fb.group(group);

//     if (this.isEditMode && this.formData && this.formData.id) {
//   this.form.addControl('id', this.fb.control(this.formData.id));
// }

    if (this.isEditMode && this.disabledFields.length > 0) {
      this.disabledFields.forEach(name => {
        if (this.form.get(name)) this.form.get(name)?.disable();
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.isEditMode ? this.form.getRawValue() : this.form.value;

      // ✅ لو الصورة موجودة ضيفها للبيانات
      if (this.selectedImage) {
        data.image = this.selectedImage;
      }

      this.formSubmit.emit(data);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.form.get(controlName)?.setValue(input.files[0]);
    }
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }
}




























// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { CommonModule, DecimalPipe } from '@angular/common';
// import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-form-module',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, DecimalPipe],
//   templateUrl: './form-module.component.html',
//   styleUrls: ['./form-module.component.css']
// })
// export class FormModuleComponent implements OnInit {
//   @Input() disabledFields: string[] = [];
// @Input() showImageUpload: boolean = false;
//   @Input() title!: string;
//   @Input() subtitle?: string;
//   @Input() fields: any[] = [];
//   @Input() formData: any = null;
//   @Input() submitText: string = 'حفظ';
//   @Input() showOfferItems: boolean = false; // ✅ لعرض بنود العرض فقط عند الحاجة
//   @Input() isEditMode: boolean = false;

//   @Output() formSubmit = new EventEmitter<any>();
//   @Output() cancel = new EventEmitter<void>();

//   form!: FormGroup;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.initForm();
//   }

//   initForm() {
//     const group: any = {};

//     this.fields.forEach(field => {
//       group[field.name] = field.required
//         ? [this.formData ? this.formData[field.name] : '', Validators.required]
//         : [this.formData ? this.formData[field.name] : ''];
//     });

//     this.form = this.fb.group(group);

//     // ✅ إضافة items فقط لما نحتاجها
//     if (this.showOfferItems) {
//       this.form.addControl('items', this.fb.array([]));

//       if (this.formData?.items?.length) {
//         this.formData.items.forEach((item: any) => this.addItem(item));
//       } else {
//         this.addItem(); // بند واحد افتراضي
//       }
//     }
//   }

//   get items(): FormArray {
//     return this.form.get('items') as FormArray;
//   }

//   addItem(data: any = null) {
//     if (this.items.length > 0 && !this.items.valid) return;

//     const group = this.fb.group({
//       description: [data?.description || '', Validators.required],
//       quantity: [data?.quantity || 1, [Validators.required, Validators.min(1)]],
//       unitPrice: [data?.unitPrice || 0, [Validators.required, Validators.min(0)]],
//       discountPercentage: [data?.discountPercentage || 0, [Validators.required, Validators.min(0), Validators.max(100)]],
//       itemNotes: [data?.itemNotes || ''],
//       id: [data?.id || 0]
//     });

//     this.items.push(group);
//   }

//   removeItem(index: number) {
//     if (this.items.length > 1) this.items.removeAt(index);
//   }

//   getItemTotal(item: FormGroup): number {
//     const quantity = item.get('quantity')?.value || 0;
//     const price = item.get('unitPrice')?.value || 0;
//     const discount = item.get('discountPercentage')?.value || 0;
//     return quantity * price * (1 - discount / 100);
//   }

//   get totalSum(): number {
//     return this.items?.controls?.reduce((sum, item) => sum + this.getItemTotal(item as FormGroup), 0) || 0;
//   }

//   onSubmit() {
//     if (this.form.invalid) {
//       this.form.markAllAsTouched();
//       return;
//     }
//     this.formSubmit.emit(this.form.value);
//   }

//   onCancel() {
//     this.cancel.emit();
//   }


//   get itemsArray(): FormArray {
//     return this.form.get('items') as FormArray;
//   }
// }




























// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';

// export interface FormField {
//   name: string;
//   label?: string;
//   type?: string; // text, number, email, date, select, textarea, file, items
//   placeholder?: string;
//   required?: boolean;
//   options?: { value: any, label: string }[];
//   rowGroup?: FormField[];
// }

// @Component({
//   selector: 'app-form-module',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './form-module.component.html',
//   styleUrls: ['./form-module.component.css']
// })
// export class FormModuleComponent implements OnInit {
//   @Input() title!: string;
//   @Input() subtitle?: string;
//   @Input() fields: FormField[] = [];
//   @Input() submitText: string = 'حفظ';
//   @Input() formData: any = null;
//   @Input() disabledFields: string[] = [];
//   @Input() showImageUpload: boolean = false;

//   @Output() cancel = new EventEmitter<void>();
//   @Output() formSubmit = new EventEmitter<any>();

//   form!: FormGroup;
//   isEditMode: boolean = false;
//   previewUrl: string | ArrayBuffer | null = null;
//   selectedImage: File | null = null;

//   // totals
//   subtotal = 0;
//   totalDiscount = 0;
//   totalAmount = 0;

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.isEditMode = !!this.formData;
//     const group: any = {};

//     // build group for regular fields (except items)
//     this.fields.forEach(field => {
//       if (field.type === 'items') {
//         // create a placeholder FormArray (will add items below)
//         group[field.name] = this.fb.array([]);
//       } else if (field.rowGroup) {
//         field.rowGroup.forEach(sub => {
//           group[sub.name!] = sub.required
//             ? [this.formData ? this.formData[sub.name!] : '', Validators.required]
//             : [this.formData ? this.formData[sub.name!] : ''];
//         });
//       } else {
//         group[field.name!] = field.required
//           ? [this.formData ? this.formData[field.name!] : '', Validators.required]
//           : [this.formData ? this.formData[field.name!] : ''];
//       }
//     });

//     this.form = this.fb.group(group);

//     // If formData contains items (edit mode) populate items array
//     const itemsField = this.fields.find(f => f.type === 'items');
//     if (itemsField) {
//       const itemsArray = this.form.get(itemsField.name!) as FormArray;
//       if (this.isEditMode && this.formData?.items && Array.isArray(this.formData.items)) {
//         this.formData.items.forEach((it: any) => itemsArray.push(this.createItem(it)));
//       } else {
//         // ensure at least one empty row
//         if (itemsArray.length === 0) itemsArray.push(this.createItem());
//       }

//       // recalc totals when items change
//       itemsArray.valueChanges.subscribe(() => this.calcTotals());
//       // initial totals
//       this.calcTotals();
//     }

//     if (this.isEditMode && this.disabledFields.length > 0) {
//       this.disabledFields.forEach(name => {
//         if (this.form.get(name)) this.form.get(name)?.disable();
//       });
//     }
//   }

//   // create single item control, optionally with existing data
//   createItem(data?: any): FormGroup {
//     return this.fb.group({
//       id: [data?.id ?? null],
//       description: [data?.description ?? '', Validators.required],
//       unitPrice: [data?.unitPrice ?? null, [Validators.required, Validators.min(0)]],
//       quantity: [data?.quantity ?? 1, [Validators.required, Validators.min(0)]],
//       discountPercentage: [data?.discountPercentage ?? 0, [Validators.min(0), Validators.max(100)]],
//       itemNotes: [data?.itemNotes ?? '']
//     });
//   }

//   // helpers to manage items
//   getItemsArray(): FormArray {
//     const itemsField = this.fields.find(f => f.type === 'items');
//     return this.form.get(itemsField!.name!) as FormArray;
//   }

//   addItem() {
//     const arr = this.getItemsArray();
//     arr.push(this.createItem());
//   }

//   removeItem(index: number) {
//     const arr = this.getItemsArray();
//     if (arr.length > 1) {
//       arr.removeAt(index);
//     }
//   }

//   getItemControl(i: number, name: string): AbstractControl | null {
//     const arr = this.getItemsArray();
//     return arr.at(i).get(name) ?? null;
//   }

//   // compute single line total
//   getLineTotal(i: number): number {
//     const arr = this.getItemsArray();
//     const g = arr.at(i);
//     const up = Number(g.get('unitPrice')?.value) || 0;
//     const q = Number(g.get('quantity')?.value) || 0;
//     const d = Number(g.get('discountPercentage')?.value) || 0;
//     const line = up * q * (1 - d / 100);
//     return Math.round((line + Number.EPSILON) * 100) / 100;
//   }

//   // calc totals
//   calcTotals() {
//     const arr = this.getItemsArray();
//     let subtotal = 0;
//     let totalDiscount = 0;
//     let totalAmount = 0;

//     for (let i = 0; i < arr.length; i++) {
//       const g = arr.at(i);
//       const up = Number(g.get('unitPrice')?.value) || 0;
//       const q = Number(g.get('quantity')?.value) || 0;
//       const d = Number(g.get('discountPercentage')?.value) || 0;
//       const lineGross = up * q;
//       const lineNet = lineGross * (1 - d / 100);
//       subtotal += lineGross;
//       totalDiscount += lineGross - lineNet;
//       totalAmount += lineNet;
//     }

//     this.subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100;
//     this.totalDiscount = Math.round((totalDiscount + Number.EPSILON) * 100) / 100;
//     this.totalAmount = Math.round((totalAmount + Number.EPSILON) * 100) / 100;
//   }

//   onSubmit() {
//     // validation: ensure at least one item with description
//     const itemsArr = this.getItemsArray();
//     if (itemsArr.length === 0) {
//       itemsArr.setErrors({ required: true });
//     }

//     if (this.form.valid) {
//       const data = this.isEditMode ? this.form.getRawValue() : this.form.value;

//       // attach totals optionally
//       data.subtotal = this.subtotal;
//       data.totalDiscount = this.totalDiscount;
//       data.totalAmount = this.totalAmount;

//       // include image if selected
//       if (this.selectedImage) {
//         // attach file object (parent may convert to FormData if needed)
//         data.image = this.selectedImage;
//       }

//       this.formSubmit.emit(data);
//     } else {
//       this.form.markAllAsTouched();
//     }
//   }

//   onCancel() {
//     this.cancel.emit();
//   }

//   onFileChange(event: Event, controlName: string) {
//     const input = event.target as HTMLInputElement;
//     if (input?.files && input.files.length > 0) {
//       this.form.get(controlName)?.setValue(input.files[0]);
//     }
//   }

//   onImageChange(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files[0]) {
//       const file = input.files[0];
//       this.selectedImage = file;

//       const reader = new FileReader();
//       reader.onload = () => (this.previewUrl = reader.result);
//       reader.readAsDataURL(file);
//     }
//   }
// }
