import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Core/services/data.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: any[] = [];
  showModal = false;
  isEditMode = false;
  selectedClient: any = null;
  selectedFile: File | null = null;

  constructor(
    private _dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  clientColumns = [
    { field: 'imageUrl', header: 'الصورة', type: 'image' as const },
    { field: 'name', header: 'الاسم', type: 'text' as const },
    { field: 'phoneNumber', header: 'الهاتف', type: 'text' as const },
    { field: 'email', header: 'الإيميل', type: 'text' as const },
    { field: 'address', header: 'العنوان', type: 'text' as const }
  ];

  clientFields = [
    { name: 'name', label: 'إسم العميل', type: 'text', required: true, placeholder: 'أدخل إسم العميل' },
    { name: 'phoneNumber', label: 'رقم الهاتف', type: 'text', required: true, placeholder: '+90512345678' },
    { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true, placeholder: 'example@example.com' },
    { name: 'address', label: 'عنوان العميل', type: 'text', required: true, placeholder: 'أدخل العنوان' },
    { name: 'imageUrl', label: 'صورة العميل', type: 'file', required: false },
  ];

  // تحميل البيانات من الـ API
  loadClients() {
    this._dataService.GetAllClients().subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.clients = res.data.items || res.data;
          console.log(this.clients)
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل العملاء' });
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedClient = null;
    this.showModal = true;
  }

  openEditModal(client: any) {
    this.isEditMode = true;
    this.selectedClient = { ...client };
    this.showModal = true;
  }

  closeForm() {
    this.showModal = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // إضافة عميل جديد
  addClient(data: any) {
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('PhoneNumber', data.phoneNumber);
    formData.append('Email', data.email);
    formData.append('Address', data.address);
    formData.append('ImageUrl', data.imageUrl);

    if (this.selectedFile) {
      formData.append('ImageUrl', this.selectedFile);
    }

    console.log(formData);
    this._dataService.AddClient(formData).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم إضافة العميل بنجاح' });
          this.loadClients();
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

  // تعديل عميل
  updateClient(data: any) {
    const formData = new FormData();
    formData.append('Id', this.selectedClient.id);
    formData.append('Name', data.name);
    formData.append('PhoneNumber', data.phoneNumber);
    formData.append('Email', data.email);
    formData.append('Address', data.address);
    formData.append('ImageUrl', data.imageUrl);

    if (this.selectedFile) {
      formData.append('ImageUrl', this.selectedFile);
    }

    console.log(formData);
    this._dataService.EditClient(formData).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم تعديل العميل بنجاح' });
          this.loadClients();
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

  // حذف عميل
  deleteClient(id: number) {
    this.confirmationService.confirm({
      message: 'هل أنت متأكد من حذف هذا العميل؟',
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._dataService.DeleteClient(id).subscribe({
          next: (res) => {
            if (res?.isValid) {
              this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم حذف العميل بنجاح' });
              this.loadClients();
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

  getFullImageUrl(relativePath: string): string {
  if (!relativePath) return 'assets/images/default-avatar.png'; // صورة افتراضية
  return `https://newerp.runasp.net/${relativePath}`;
}

}
