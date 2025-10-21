import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Core/services/data.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit {

  contractors: any[] = [];
  showModal = false;
  isEditMode = false;
  selectedContractor: any = null;

  contractorColumns = [
    { field: 'name', header: 'اسم المقاول', type: 'text' as const },
    { field: 'address', header: 'العنوان', type: 'text' as const },
    { field: 'phoneNumber', header: 'رقم الهاتف', type: 'text' as const },
  ];

  contractorFields = [
    { name: 'name', label: 'اسم المقاول', type: 'text', required: true, placeholder: 'ادخل اسم المقاول' },
    { name: 'address', label: 'العنوان', type: 'text', required: true, placeholder: 'ادخل العنوان' },
    { name: 'phoneNumber', label: 'رقم الهاتف', type: 'text', required: true, placeholder: '+966...' },
  ];

  constructor(
    private _dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadContractors();
  }

  // 🔹 تحميل البيانات
  loadContractors() {
    this._dataService.GetAllContractor().subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.contractors = res.data || [];
          console.log(this.contractors)
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء تحميل المقاولين' });
      }
    });
  }

  // 🔹 فتح مودال الإضافة
  openAddModal() {
    this.isEditMode = false;
    this.selectedContractor = null;
    this.showModal = true;
  }

  // 🔹 فتح مودال التعديل مع تحميل الداتا القديمة
  openEditModal(contractor: any) {
    // this.isEditMode = true;
    // this.selectedContractor = { ...contractor };
    // this.showModal = true;
  this.isEditMode = true;
  this.selectedContractor = {
    id: contractor.id, // تأكد إن id بيتسجل هنا
    name: contractor.name,
    address: contractor.address,
    phoneNumber: contractor.phoneNumber
  };
  this.showModal = true;
  }

  // 🔹 غلق الفورم
  closeForm() {
    this.showModal = false;
  }

  // 🔹 إضافة مقاول جديد
  addContractor(data: any) {
    this._dataService.AddContractor(data).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تمت إضافة المقاول بنجاح' });
          this.loadContractors();
          this.closeForm();
        } else {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: res?.message || 'حدث خطأ أثناء الإضافة' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء إضافة المقاول' });
      }
    });
  }

  // 🔹 تعديل بيانات المقاول
  updateContractor(data: any) {
    const updatedData = {
    id: this.selectedContractor.id, // الـ id اللي جاي من الجدول
    name: data.name,
    address: data.address,
    phoneNumber: data.phoneNumber
  };
    this._dataService.EditContractor(updatedData).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم تعديل بيانات المقاول بنجاح' });
          this.loadContractors();
          this.closeForm();
        } else {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: res?.message || 'حدث خطأ أثناء التعديل' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء تعديل المقاول' });
      }
    });
  }

  // 🔹 حذف المقاول
  deleteContractor(contractor: any) {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف المقاول (${contractor.name})؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'إلغاء',
      accept: () => {
        this._dataService.DeleteContractor(contractor.id).subscribe({
          next: (res) => {
            if (res?.isValid) {
              this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم حذف المقاول بنجاح' });
              this.loadContractors();
            } else {
              this.messageService.add({ severity: 'error', summary: 'خطأ', detail: res?.message || 'تعذر حذف المقاول' });
            }
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الحذف' });
          }
        });
      }
    });
  }
}
