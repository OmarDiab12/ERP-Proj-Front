import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from 'src/app/Core/services/data.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  quotations: any[] = [];
  clientsOptions: any[] = [];

  showModal = false;
  isEditMode = false;
  selectedQuotation: any = null;
  selectedFiles: File[] = [];

  quotationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadQuotations();
    this.loadClients();
  }

  quotationColumns = [
    { field: 'clientId', header: 'إسم العميل', type: 'text' as const },
    { field: 'quotationDate', header: 'تاريخ العرض', type: 'date' as const },
    { field: 'isValidTo', header: 'صالح حتى', type: 'date' as const },
    { field: 'status', header: 'الحالة', type: 'status' as const },
    { field: 'totalAmount', header: 'إجمالى المبلغ ', type: 'currency' as const }
  ];

  // ======= Form Setup =======
  buildForm() {
    this.quotationForm = this.fb.group({
      ClientId: ['', Validators.required],
      QuotationDate: ['', Validators.required],
      Status: ['', Validators.required],
      isValidTo: ['', Validators.required],
      GeneralNotes: [''],
      Items: this.fb.array([this.createItem()]),
      files: [''],
      id: [0]
    });
  }

  createItem(data?: any): FormGroup {
    return this.fb.group({
      description: [data?.description || '', Validators.required],
      unitPrice: [data?.unitPrice || 0, Validators.required],
      quantity: [data?.quantity || 1, Validators.required],
      discountPercentage: [data?.discountPercentage || 0],
      itemNotes: [data?.itemNotes || ''],
      id: [data?.id || 0]
    });
  }

  get itemsArray(): FormArray {
    return this.quotationForm.get('Items') as FormArray;
  }

  addItem() {
    this.itemsArray.push(this.createItem());
  }

  removeItem(i: number) {
    if (this.itemsArray.length > 1) this.itemsArray.removeAt(i);
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);
      this.quotationForm.patchValue({ files: this.selectedFiles });
    }
  }

  getItemTotal(item: any): number {
    const { unitPrice, discountPercentage, quantity } = item;

    // لو فيه سعر بعد الخصم استخدمه، لو لأ استخدم السعر الأصلي
    const priceToUse = discountPercentage && discountPercentage > 0
      ? discountPercentage
      : unitPrice;

    return (priceToUse || 0) * (quantity || 0);
  }

  getTotalBeforeDiscount(): number {
    return this.itemsArray.value.reduce((acc: number, item: any) => {
      return acc + (item.unitPrice || 0) * (item.quantity || 0);
    }, 0);
  }

  getTotalAfterDiscount(): number {
    return this.itemsArray.value.reduce((acc: number, item: any) => {
      const priceToUse = item.discountPercentage && item.discountPercentage > 0
        ? item.discountPercentage
        : item.unitPrice;
      return acc + (priceToUse || 0) * (item.quantity || 0);
    }, 0);
  }


  // ======= API Methods =======
  loadQuotations() {
    this.dataService.GetAllQuotations().subscribe({
      next: (res) => { this.quotations = res?.data || []; console.log(this.quotations) },
      error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل العروض' })
    });
  }

  loadClients() {
    this.dataService.GetAllClients().subscribe({
      next: (res) => {
        const clients = res?.data || [];
        this.clientsOptions = clients.map((c: any) => ({ value: c.id, label: c.name }));
      }
    });
  }

  // ======= Modal Actions =======
  openAddModal() {
    this.isEditMode = false;
    this.selectedQuotation = null;
    this.buildForm();
    this.showModal = true;
  }


  openEditModal(q: any) {
    this.isEditMode = true;
    // Build the form first
    this.buildForm();

    // Try to get full quotation details from the API (in case the table row contains partial data)
    if (q && q.id) {
      this.dataService.GetQuotationsById(q.id).subscribe({
        next: (res) => {
          const detail = res?.data || q;
          this.fillQuotationFormFromDetail(detail);
        },
        error: () => {
          // fallback to using provided object
          this.fillQuotationFormFromDetail(q);
        }
      });
    } else {
      this.fillQuotationFormFromDetail(q);
    }
  }

  // helper to populate the form from a full quotation object
  private fillQuotationFormFromDetail(detail: any) {
    this.quotationForm.patchValue({
      ClientId: detail.clientId ?? detail.ClientId ?? '',
      QuotationDate: detail.quotationDate ? String(detail.quotationDate).split('T')[0] : (detail.QuotationDate ? String(detail.QuotationDate).split('T')[0] : ''),
      Status: detail.status ?? detail.Status ?? '',
      isValidTo: detail.isValidTo ? String(detail.isValidTo).split('T')[0] : (detail.isValidTo ? String(detail.isValidTo).split('T')[0] : ''),
      GeneralNotes: detail.generalNotes ?? detail.GeneralNotes ?? '',
      id: detail.id ?? 0
    });

    // items
    this.itemsArray.clear();
    if (detail.items && detail.items.length > 0) {
      detail.items.forEach((item: any) => {
        this.itemsArray.push(this.createItem({
          description: item.description ?? item.Description ?? '',
          unitPrice: item.unitPrice ?? item.UnitPrice ?? 0,
          quantity: item.quantity ?? item.Quantity ?? 1,
          discountPercentage: item.discountPercentage ?? item.DiscountPercentage ?? 0,
          itemNotes: item.itemNotes ?? item.ItemNotes ?? '',
          id: item.id ?? 0
        }));
      });
    } else {
      this.itemsArray.push(this.createItem());
    }

    // if there are files info, map selectedFiles names (optional)
    if (detail.files && Array.isArray(detail.files) && detail.files.length > 0) {
      // store filenames only; actual File objects can't be reconstructed
      this.selectedFiles = detail.files as File[];
    } else {
      this.selectedFiles = [];
    }

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // ======= CRUD Actions =======
  submitQuotation() {
    console.log(this.quotationForm.value);
    if (this.quotationForm.invalid) {
      this.quotationForm.markAllAsTouched();
      return;
    }

    const data = this.quotationForm.value;

    if (this.isEditMode) {
      this.updateQuotation(data);
    } else {
      this.addQuotation(data);
    }
  }



  addQuotation(data: any) {
    const formData = new FormData();

    // القيم الأساسية
    formData.append('ClientId', data.ClientId);
    formData.append('QuotationDate', data.QuotationDate);
    formData.append('Status', data.Status);
    formData.append('isValidTo', data.isValidTo);
    formData.append('GeneralNotes', data.GeneralNotes || '');
    formData.append('id', data.id || 0);

    // الـ Items كـ JSON string
    formData.append('Items', JSON.stringify(data.Items));

    // ✅ هنا التعديل المهم — نضيف كل الملفات مرة واحدة داخل نفس المفتاح
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      formData.append('files', JSON.stringify(this.selectedFiles.map(f => f.name))); // أسماء فقط لو السيرفر بيخزن أسماء
      this.selectedFiles.forEach((file, index) => {
        formData.append(`files[${index}]`, file); // كل ملف جوه نفس الـ array
      });
    } else {
      formData.append('files', '[]'); // لو مفيش ملفات
    }

    // إرسال البيانات
    this.dataService.AddQuotation(formData).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم إنشاء العرض بنجاح' });
          this.closeModal();
          this.loadQuotations();
        } else {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: res?.message || 'فشل الإنشاء' });
        }
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الإنشاء' })
    });
  }

  updateQuotation(data: any) {
    const formData = new FormData();

    formData.append('ClientId', data.ClientId);
    formData.append('QuotationDate', data.QuotationDate);
    formData.append('Status', data.Status);
    formData.append('isValidTo', data.isValidTo);
    formData.append('GeneralNotes', data.GeneralNotes || '');
    formData.append('id', data.id || 0);
    formData.append('Items', JSON.stringify(data.Items));

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
    }

    this.dataService.EditQuotation(formData).subscribe({
      next: (res) => {
        if (res?.isValid) {
          this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم تعديل العرض بنجاح' });
          this.closeModal();
          this.loadQuotations();
        } else {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: res?.message || 'فشل التعديل' });
        }
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء التعديل' })
    });
  }

  // deleteQuotation(q: any) {
  //   this.confirmationService.confirm({
  //     message: `هل أنت متأكد من حذف عرض السعر رقم ${q.id}؟`,
  //     header: 'تأكيد الحذف',
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptLabel: 'نعم',
  //     rejectLabel: 'إلغاء',
  //     accept: () => {
  //       this.dataService.DeleteQuotation(q.id).subscribe({
  //         next: (res) => {
  //           if (res?.isValid) {
  //             this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم حذف العرض بنجاح' });
  //             this.loadQuotations();
  //           } else {
  //             this.messageService.add({ severity: 'error', summary: 'خطأ', detail: res?.message || 'فشل الحذف' });
  //           }
  //         },
  //         error: () =>
  //           this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الحذف' })
  //       });
  //     }
  //   });
  // }


  deleteQuotation(q: any) {
  this.confirmationService.confirm({
    message: `هل أنت متأكد من حذف عرض السعر رقم ${q.id}؟`,
    header: 'تأكيد الحذف',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'نعم',
    rejectLabel: 'إلغاء',
    acceptButtonStyleClass: 'p-button-danger',
    rejectButtonStyleClass: 'p-button-secondary',
    accept: () => {
      this.dataService.DeleteQuotation(q.id).subscribe({
        next: (res) => {
          if (res?.isValid) {
            this.messageService.add({
              severity: 'success',
              summary: 'تم',
              detail: 'تم حذف العرض بنجاح'
            });
            this.loadQuotations(); // تحديث القائمة بعد الحذف
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: res?.message || 'فشل الحذف'
            });
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ',
            detail: 'حدث خطأ أثناء الحذف'
          });
        }
      });
    }
  });
}


}




