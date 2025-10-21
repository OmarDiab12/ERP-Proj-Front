import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Core/services/data.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {

  brokers: any[] = [];
  brokerColumns = [
    { field: 'name', header: 'اسم الوسيط', type: 'text' as const },
    { field: 'phoneNumber', header: 'رقم الهاتف', type: 'text' as const },
    { field: 'address', header: 'العنوان', type: 'text' as const },
  ];

  showModal = false;
  isEditMode = false;
  selectedBroker: any = null;

  brokerFields = [
    { name: 'name', label: 'اسم الوسيط', type: 'text', required: true, placeholder: 'ادخل اسم الوسيط' },
    { name: 'phoneNumber', label: 'رقم الهاتف', type: 'text', required: true, placeholder: '+966...' },
    { name: 'address', label: 'العنوان', type: 'text', required: true, placeholder: 'ادخل العنوان' },
  ];

  constructor(
    private _dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadBrokers();
  }

  loadBrokers() {
    this._dataService.GetAllBrokers().subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.brokers = res.data || [];
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء تحميل الوسطاء' });
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedBroker = null;
    this.showModal = true;
  }

  openEditModal(broker: any) {
    this.isEditMode = true;
    this.selectedBroker = { ...broker };
    this.showModal = true;
  }

  closeForm() {
    this.showModal = false;
  }

  addBroker(data: any) {
    this._dataService.AddBroker(data).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تمت إضافة الوسيط بنجاح' });
          this.loadBrokers();
          this.closeForm();
        } else {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: res?.message || 'حدث خطأ أثناء الإضافة' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء إضافة الوسيط' });
      }
    });
  }

  deleteBroker(broker: any) {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف الوسيط (${broker.name})؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'إلغاء',
      accept: () => {
        this._dataService.DeleteBroker(broker.id).subscribe({
          next: (res) => {
            if (res?.isValid) {
              this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم حذف الوسيط بنجاح' });
              this.loadBrokers();
            } else {
              this.messageService.add({ severity: 'error', summary: 'خطأ', detail: res?.message || 'تعذر حذف الوسيط' });
            }
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الحذف' });
          }
        });
      }
    });
  }

  updateBroker(data: any) {
    this._dataService.EditBroker(data).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم تعديل الوسيط بنجاح' });
          this.loadBrokers();
          this.closeForm();
        } else {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: res?.message || 'حدث خطأ أثناء التعديل' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء تعديل الوسيط' });
      }
    });
  }
}
