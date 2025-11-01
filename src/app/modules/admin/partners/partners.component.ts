import { Component } from '@angular/core';
import { FormModuleComponent } from "src/app/shared/components/form-module/form-module.component";

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
})
export class PartnersComponent {
  selectedTab: number = 0;
  smallSelectedTab: number = 0;

  employees = [
  { name: 'محمد أحمد السالم', dept: 'المحاسبة', loan: 50000, grantDate: '2024-06-15', installments: 12, remaining: 35000, status: 'نشط' },
  { name: 'سارة عبدالله المطيري', dept: 'الموارد البشرية', loan: 30000, grantDate: '2025-01-01', installments: 10, remaining: 0, status: 'مكتمل' },
  { name: 'عبدالرحمن خالد العتيبي', dept: 'المشاريع', loan: 75000, grantDate: '2024-12-01', installments: 18, remaining: 68000, status: 'متأخر' }
];

employeeColumns = [
  { field: 'name', header: 'اسم الموظف', type: 'text' as const},
  { field: 'dept', header: 'القسم', type: 'text' as const },
  { field: 'loan', header: 'مبلغ السلفة', type: 'currency' as const },
  { field: 'grantDate', header: 'تاريخ المنح', type: 'date' as const,styleClass: 'red' },
  { field: 'installments', header: 'الأقساط', type: 'number' as const,cellStyle: (value: any) => value >=11 ? 'green' : 'red'},
  { field: 'remaining', header: 'المبلغ المتبقي', type: 'currency' as const },
  { field: 'status', header: 'الحالة', type: 'status' as const }
];



showModal = false;
  isEditMode = false;

  // 🧱 الحقول بتاعة الفورم
  partnerFields = [
    { name: 'responsible', label: 'الشخص المسؤول', type: 'text', required: true, placeholder: 'الاسم المسؤول عنه' },
    { name: 'partnerrName', label: 'اسم الشريك', type: 'text', required: true, placeholder: 'ادخل اسم الشريك' },
    { name: 'phone', label: 'رقم الهاتف', type: 'text', required: true, placeholder: '+90512345678' },
    { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true, placeholder: 'example@example.com' },
    {
      name: 'status',
      label: 'الحالة',
      type: 'select',
      options: [
        { value: 'active', label: 'نشط' },
        { value: 'inactive', label: 'غير نشط' }
      ]
    }
  ];

  // 📦 بيانات الشريك المختار فى حالة التعديل
  selectedPartner: any = null;

  // 🧩 فتح مودال الإضافة
  openAddModal() {
    this.isEditMode = false;
    this.selectedPartner = null;
    this.showModal = true;
  }

  // 🧩 فتح مودال التعديل
  openEditModal(partner: any) {
    this.isEditMode = true;
    this.selectedPartner = { ...partner };
    this.showModal = true;
  }

  // 🚪 غلق المودال
  closeForm() {
    this.showModal = false;
  }

  // ➕ إضافة شريك جديد (هيبقى هنا الـ API بعدين)
  addPartner(data: any) {
    console.log('✅ إضافة شريك جديد:', data);
    // TODO: Call Add Supplier API هنا
    this.closeForm();
  }

  // ✏️ تعديل شريك موجود (هيبقى هنا الـ API بعدين)
  updatePartner(data: any) {
    console.log('✏️ تعديل بيانات الشريك:', data);
    // TODO: Call Update Supplier API هنا
    this.closeForm();
  }


}
