import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/Core/services/data.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  loans: any[] = [];
  loading = false;
  showModal = false;
  isEditMode = false;
  selectedLoan: any = null;
  totalAmount = 0;
  totalPaid = 0;
  totalRemaining = 0;
  activeLoansCount = 0;
  employeesOptions: any[] = [];

  constructor(
    private dataService:DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadLoans();
  }

  // 🔵 تحميل الموظفين لاستخدامهم فى اختيار الموظف عند إضافة/تعديل سلفة
  loadEmployees() {
    this.dataService.GetAllEmployees().subscribe({
      next: (res: any) => {
        const list = res?.data ?? res ?? [];
        this.employeesOptions = (list || []).map((e: any) => ({ value: e.id ?? e.ID ?? e.employeeId ?? e.id, label: e.name ?? e.fullName ?? e.personName ?? e.employeeName }));
        // if editing and selectedLoan exists with a personName, map it to personId so the select pre-fills
        if (this.isEditMode && this.selectedLoan) {
          const name = this.selectedLoan.personName ?? this.selectedLoan.personName ?? this.selectedLoan.person ?? null;
          if (name) {
            const found = this.employeesOptions.find(x => String(x.label) === String(name));
            if (found) this.selectedLoan.personId = found.value;
          }
        }
          // attach options to form field so the select shows employees
          if (this.loanFields && this.loanFields.length) this.loanFields[0].options = this.employeesOptions;
      },
      error: (err) => {
        console.error('Failed to load employees', err);
      }
    });
  }

  // 🧾 تحميل القروض من السيرفر
  loadLoans() {
    this.loading = true;
    this.dataService.GetAllPersonalLoan(1, 50).subscribe({
      next: (res: any) => {
        // normalize possible response shapes: { data: { items: [...] } } or { data: [...] } or [...]
        const maybeItems = res?.data?.items ?? res?.data ?? res ?? [];
        this.loans = Array.isArray(maybeItems) ? maybeItems : [];
        // total granted
        this.totalAmount = (this.loans || []).reduce((sum: number, l: any) => sum + (Number(l.amount) || 0), 0);
        // total already paid (where isRepaid truthy)
        this.totalPaid = (this.loans || []).reduce((sum: number, l: any) => {
          const repaid = (l?.isRepaid === true || l?.isRepaid === 'true' || l?.isRepaid === 1 || l?.isRepaid === '1');
          return sum + (repaid ? (Number(l.amount) || 0) : 0);
        }, 0);
        // remaining = granted - paid
        this.totalRemaining = this.totalAmount - this.totalPaid;
        // active loans count = loans not repaid
        this.activeLoansCount = (this.loans || []).filter(l => !(l?.isRepaid === true || l?.isRepaid === 'true' || l?.isRepaid === 1 || l?.isRepaid === '1')).length;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }


  loanColumns = [
  { field: 'personName', header: 'اسم الموظف', type: 'text' as const },
  { field: 'amount', header: 'المبلغ', type: 'currency' as const },
  { field: 'issueDate', header: 'تاريخ الإصدار', type: 'date' as const },
  { field: 'repaymentDate', header: 'تاريخ السداد', type: 'date' as const },
  { field: 'isRepaid', header: 'تم السداد', type: 'status' as const }
];


  // 🧾 الحقول داخل المودال (base fields — isRepaid handled only in edit mode)
  loanFields: any[] = [
    { name: 'personId', label: 'اسم الموظف (اختيار)', type: 'select', options: [], required: true, placeholder: 'اختر الموظف' },
    // allow fallback free-text name if employee not listed
    // { name: 'personName', label: 'اسم الموظف (نص)', type: 'text', placeholder: 'ادخل اسم الموظف إن لم تجده فى القائمة' },
    { name: 'amount', label: 'المبلغ', type: 'number', required: true, placeholder: 'ادخل المبلغ' },
    { name: 'issueDate', label: 'تاريخ الإصدار', type: 'date', required: true },
    { name: 'repaymentDate', label: 'تاريخ السداد', type: 'date', required: true }
  ];

  // return the fields to pass to the form component depending on mode
  get effectiveLoanFields() {
    // in edit mode include isRepaid checkbox
    if (this.isEditMode) {
      // avoid duplicating if already present
      const has = this.loanFields.find(f => f.name === 'isRepaid');
      if (!has) {
        return [...this.loanFields, {
          name: 'isRepaid',
          label: 'تم السداد',
          type: 'select',
          options: [
            { value: true, label: 'نعم' },
            { value: false, label: 'لا' }
          ],
          required: false
        }];
      }
    }
    // creation: ensure isRepaid is not present
    return this.loanFields.filter(f => f.name !== 'isRepaid');
  }

  // ➕ فتح المودال للإضافة
  openAddModal() {
    this.isEditMode = false;
    this.selectedLoan = null;
    this.showModal = true;
  }

  // ✏️ فتح المودال للتعديل
  openEditModal(loan: any) {
    this.isEditMode = true;
    this.selectedLoan = { ...loan };
    // try map personName to personId immediately if we have employees loaded
    const name = this.selectedLoan.personName ?? this.selectedLoan.person ?? this.selectedLoan.personName;
    if (name && this.employeesOptions && this.employeesOptions.length) {
      const found = this.employeesOptions.find(x => String(x.label) === String(name));
      if (found) this.selectedLoan.personId = found.value;
    }
    this.showModal = true;
  }

  // 🚪 غلق المودال
  closeForm() {
    this.showModal = false;
  }

  // 🟢 إضافة قرض جديد
  addLoan(data: any) {
    // build exact payload shape expected for create: { personName, issueDate, amount, repaymentDate }
    const found = data.personId ? this.employeesOptions.find(e => String(e.value) === String(data.personId)) : null;
    const payload: any = {
      personName: found ? found.label : (data.personName ?? null),
      issueDate: data.issueDate,
      amount: Number(data.amount) || 0,
      repaymentDate: data.repaymentDate
    };

    this.dataService.AddPersonalLoan(payload).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'تمت الإضافة', detail: 'تمت إضافة السلفة بنجاح' });
        this.closeForm();
        this.loadLoans();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الإضافة' });
      }
    });
  }

  // 🟡 تعديل قرض
  updateLoan(data: any) {
    // build exact payload: { personName, issueDate, amount, repaymentDate, id, isRepaid }
    const found = data.personId ? this.employeesOptions.find(e => String(e.value) === String(data.personId)) : null;
    const payload: any = {
      personName: found ? found.label : (data.personName ?? this.selectedLoan?.personName ?? null),
      issueDate: data.issueDate,
      amount: Number(data.amount) || 0,
      repaymentDate: data.repaymentDate,
      id: this.selectedLoan?.id ?? 0,
      isRepaid: (typeof data.isRepaid !== 'undefined') ? !!data.isRepaid : !!this.selectedLoan?.isRepaid
    };

    console.log(payload);
    this.dataService.EditPersonalLoan(payload).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'تم التعديل', detail: 'تم تعديل السلفة بنجاح' });
        this.closeForm();
        this.loadLoans();
      },
      error: (err) => {
        console.error('❌ خطأ أثناء التعديل:', err);
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء التعديل' });
      }
    });
  }

  // 🔴 تأكيد الحذف
  confirmDelete(loan: any) {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف السلفة الخاصة بـ ${loan.personName}؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'إلغاء',
      accept: () => {
        this.deleteLoan(loan.id);
      }
    });
  }

  // 🗑️ حذف قرض
  deleteLoan(id: number) {
    this.dataService.DeletePersonalLoan(id).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'تم الحذف', detail: 'تم حذف السلفة بنجاح' });
        this.loadLoans();
      },
      error: (err) => {
        console.error('❌ خطأ أثناء الحذف:', err);
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الحذف' });
      }
    });
  }
}
