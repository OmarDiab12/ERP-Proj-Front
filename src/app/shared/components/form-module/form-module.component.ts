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
