import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Core/services/data.service';
import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: any[] = [];
  showModal = false;
  isEditMode = false;
  selectedEmployee: any = null;
  averageSalary: number = 0;

  constructor(
    private _dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // أعمدة الجدول
  employeeColumns = [
    { field: 'name', header: 'الاسم', type: 'text' as const },
    { field: 'jobTitle', header: 'المسمى الوظيفي', type: 'text' as const },
    { field: 'phoneNumber', header: 'رقم الهاتف', type: 'text' as const },
    { field: 'email', header: 'البريد الإلكتروني', type: 'text' as const },
    { field: 'baseSalary', header: 'الراتب الأساسي', type: 'text' as const },
  ];

  // حقول النموذج
  employeeFields = [
    { name: 'name', label: 'اسم الموظف', type: 'text', required: true, placeholder: 'أدخل اسم الموظف' },
    { name: 'jobTitle', label: 'المسمى الوظيفي', type: 'text', required: true, placeholder: 'أدخل المسمى الوظيفي' },
    { name: 'phoneNumber', label: 'رقم الهاتف', type: 'text', required: true, placeholder: '+20123456789' },
    { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true, placeholder: 'example@example.com' },
    { name: 'baseSalary', label: 'الراتب الأساسي', type: 'number', required: true, placeholder: '0' },
  ];

  // تحميل الموظفين من الـ API
  loadEmployees() {
    this._dataService.GetAllEmployees().subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.employees = res.data.items || res.data;
          this.calculateAverageSalary();
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل الموظفين' });
      }
    });
  }

  // فتح نموذج الإضافة
  openAddModal() {
    this.isEditMode = false;
    this.selectedEmployee = null;
    this.showModal = true;
  }

  // فتح نموذج التعديل
  openEditModal(employee: any) {
    this.isEditMode = true;
    this.selectedEmployee = { ...employee };
    this.showModal = true;
  }

  // غلق النموذج
  closeForm() {
    this.showModal = false;
  }

  // إضافة موظف جديد
  addEmployee(data: any) {
    const body = {
      name: data.name,
      jobTitle: data.jobTitle,
      phoneNumber: data.phoneNumber,
      email: data.email,
      baseSalary: data.baseSalary
    };

    this._dataService.AddEmployee(body).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تمت إضافة الموظف بنجاح' });
          this.loadEmployees();
          this.showModal = false;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'تحذير', detail: res?.message || 'فشل الإضافة' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الإضافة' });
      }
    });
  }

  // تعديل موظف
  updateEmployee(data: any) {
    const body = {
      id: this.selectedEmployee.id,
      name: data.name,
      jobTitle: data.jobTitle,
      phoneNumber: data.phoneNumber,
      email: data.email,
      baseSalary: data.baseSalary
    };

    this._dataService.EditEmployee(body).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم تعديل بيانات الموظف بنجاح' });
          this.loadEmployees();
          this.showModal = false;
        } else {
          this.messageService.add({ severity: 'warn', summary: 'تحذير', detail: res?.message || 'فشل التعديل' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء التعديل' });
      }
    });
  }

  // حذف موظف
  deleteEmployee(employee: any) {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف الموظف ${employee.name}؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'إلغاء',
      accept: () => {
        this._dataService.DeleteEmployee(employee.id).subscribe({
          next: (res) => {
            if (res?.isValid) {
              this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم حذف الموظف بنجاح' });
              this.loadEmployees();
            } else {
              this.messageService.add({ severity: 'warn', summary: 'تحذير', detail: res?.message || 'فشل الحذف' });
            }
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الحذف' });
          }
        });
      }
    });
  }

  // حساب متوسط الرواتب
  calculateAverageSalary() {
    if (this.employees.length > 0) {
      const total = this.employees.reduce((sum, emp) => sum + (emp.baseSalary || 0), 0);
      this.averageSalary = Math.round(total / this.employees.length);
    } else {
      this.averageSalary = 0;
    }
  }
}
