import { Component } from '@angular/core';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {











  loans = [
    { name: 'محمد أحمد السالم', dept: 'المحاسبة', loan: 50000, grantDate: '+2562155811255', installments: 12, status: 'نشط' },
    { name: 'سارة عبدالله المطيري', dept: 'الموارد البشرية', loan: 30000, grantDate: '+2562155811255', installments: 10, status: 'مكتمل' },
    { name: 'عبدالرحمن خالد العتيبي', dept: 'المشاريع', loan: 75000, grantDate: '+2562155811255', installments: 18, status: 'متأخر' }
  ];

  loanColumns = [
    { field: 'name', header: 'اسم المورد', type: 'text' as const },
    { field: 'dept', header: 'الشخص المسؤول', type: 'text' as const },
    { field: 'loan', header: 'البريد الإلكترونى', type: 'currency' as const },
    { field: 'grantDate', header: 'الهاتف', type: 'text' as const },
    { field: 'installments', header: 'إجمالى الطلبات', type: 'number' as const },
    { field: 'status', header: 'الإجراءات', type: 'status' as const }
  ];








  showModal = false;
  isEditMode = false;

  // 🧱 الحقول بتاعة الفورم
  loanFields = [
    { name: 'responsible', label: 'الشخص المسؤول', type: 'text', required: true, placeholder: 'الاسم المسؤول عنه' },
    { name: 'supplierName', label: 'اسم المورد', type: 'text', required: true, placeholder: 'ادخل اسم المورد' },
    { name: 'phone', label: 'رقم الهاتف', type: 'text', required: true, placeholder: '+90512345678' },
    { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true, placeholder: 'example@example.com' },
    {
      name: 'status',
      label: 'الحالة',
      type: 'select',
      options: [
        { value: '', label: 'إختر الحالة', disabled: true},
        { value: 'active', label: 'نشط' },
        { value: 'inactive', label: 'غير نشط' }
      ],
      required: true,
      placeholder: 'اختر الحالة'
    }

  ];

  // 📦 بيانات المورد المختار فى حالة التعديل
  selectedLoan: any = null;

  // 🧩 فتح مودال الإضافة
  openAddModal() {
    this.isEditMode = false;
    this.selectedLoan = null;
    this.showModal = true;
  }

  // 🧩 فتح مودال التعديل
  openEditModal(loan: any) {
    this.isEditMode = true;
    this.selectedLoan = { ...loan };
    this.showModal = true;
  }

  // 🚪 غلق المودال
  closeForm() {
    this.showModal = false;
  }

  // ➕ إضافة سلفة جديد (هيبقى هنا الـ API بعدين)
  addLoan(data: any) {
    console.log('✅ إضافة سلفة جديد:', data);
    // TODO: Call Add Supplier API هنا
    this.closeForm();
  }

  // ✏️ تعديل سلفة موجود (هيبقى هنا الـ API بعدين)
  updateLoan(data: any) {
    console.log('✏️ تعديل بيانات السلفة:', data);
    // TODO: Call Update Supplier API هنا
    this.closeForm();
  }
}
