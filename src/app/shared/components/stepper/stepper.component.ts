// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-stepper',
//   templateUrl: './stepper.component.html',
//   styleUrls: ['./stepper.component.css']
// })
// export class StepperComponent {
// activeStep = 1;

//   formData = {
//     name: '',
//     email: '',
//     address: '',
//     phone: ''
//   };

//   steps = [
//     { value: 1, label: 'البيانات الأساسية', icon: 'pi pi-user' },
//     { value: 2, label: 'معلومات إضافية', icon: 'pi pi-info-circle' },
//     { value: 3, label: 'تأكيد', icon: 'pi pi-check' }
//   ];

//   submitForm() {
//     console.log('Form Submitted ✅', this.formData);
//     alert('تم إرسال البيانات بنجاح');
//   }
// }



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-stepper',
//   templateUrl: './stepper.component.html',
//   styleUrls: ['./stepper.component.css']
// })
// export class StepperComponent {
//   currentStep = 1;

//   steps = [
//     { label: 'البيانات الأساسية' },
//     { label: 'التفاصيل الإضافية' },
//     { label: 'المراجعة والتأكيد' },
//   ];

//   nextStep() {
//     if (this.currentStep < this.steps.length) {
//       this.currentStep++;
//     }
//   }

//   prevStep() {
//     if (this.currentStep > 1) {
//       this.currentStep--;
//     }
//   }
// }





















// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-stepper',
//   templateUrl: './stepper.component.html',
//   styleUrls: ['./stepper.component.css']
// })
// export class StepperComponent {
//   currentStep = 1;

//   steps = [
//     { value: 1, label: 'المعلومات الأساسية', icon: 'pi pi-file' },
//     { value: 2, label: 'المستندات', icon: 'pi pi-upload' },
//     { value: 3, label: 'الوسيط والعمولة', icon: 'pi pi-dollar' },
//     { value: 3, label: 'المقاولون', icon: 'pi pi-wrench' },
//     { value: 3, label: 'Account created', icon: 'pi pi-id-card' }
//   ];

//   // form model
//   formData = {
//     name: '',
//     email: '',
//     password: ''
//   };

//   // interests toggles
//   interests: any = {
//     option1: false,
//     option2: false,
//     option3: false,
//     option4: false,
//     option5: false,
//     option6: false,
//     option7: false,
//     option8: false,
//     option9: false,
//     option10: false
//   };

//   goTo(step: number) {
//     // allow clicking on past and future steps if you want; or restrict
//     this.currentStep = step;
//   }

//   next() {
//     if (this.currentStep < this.steps.length) this.currentStep++;
//   }

//   prev() {
//     if (this.currentStep > 1) this.currentStep--;
//   }

//   submit() {
//     // هنا ترجع تنفذ أي حاجة: call API أو emit event
//     console.log('submit', { formData: this.formData, interests: this.interests });
//     alert('Account created — data logged in console');
//   }

//   // helper to check completed state
//   isCompleted(i: number) {
//     return i + 1 < this.currentStep;
//   }
// }









// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------









// import { Component } from '@angular/core';


// @Component({
//   selector: 'app-stepper',
//   templateUrl: './stepper.component.html',
//   styleUrls: ['./stepper.component.css']
// })
// export class StepperComponent {
//   // 🔹 الخطوة الحالية
//   currentStep = 1;

//   // 🔹 تعريف الخطوات
//   steps = [
//     { value: 1, label: 'المعلومات الأساسية', icon: 'pi pi-file' },
//     { value: 2, label: 'المستندات', icon: 'pi pi-upload' },
//     { value: 3, label: 'الوسيط والعمولة', icon: 'pi pi-dollar' },
//     { value: 4, label: 'المقاولون', icon: 'pi pi-users' },
//     { value: 5, label: 'مراجعة المشروع', icon: 'pi pi-check-circle' }
//   ];

//   // 🔹 نموذج البيانات اللى هيتم ملؤه عبر الخطوات
//   formData: any = {
//     projectName: '',
//     clientName: '',
//     location: '',
//     status: '',
//     description: '',
//     quotationId: null,
//     file: null,
//     agentName: '',
//     commissionRate: '',
//     contractors: []
//   };

//   // 🔹 القوائم (Dropdowns)
//   statusOptions = [
//     { label: 'قيد التنفيذ', value: 'قيد التنفيذ' },
//     { label: 'مكتمل', value: 'مكتمل' },
//     { label: 'ملغي', value: 'ملغي' }
//   ];

//   quotationOptions = [
//     { label: 'عرض سعر 1', value: 1 },
//     { label: 'عرض سعر 2', value: 2 },
//     { label: 'عرض سعر 3', value: 3 }
//   ];

//   contractorsOptions = [
//     { label: 'مقاول أحمد', value: 'أحمد' },
//     { label: 'مقاول محمد', value: 'محمد' },
//     { label: 'مقاول علي', value: 'علي' }
//   ];

//   // 🔹 رفع الملف
//   onFileSelect(event: any) {
//     this.formData.file = event.target.files[0];
//   }

//   // 🔹 التنقل بين الخطوات
//   goTo(step: number) { this.currentStep = step; }
//   next() { if (this.currentStep < this.steps.length) this.currentStep++; }
//   prev() { if (this.currentStep > 1) this.currentStep--; }

//   // 🔹 إظهار إتمام الخطوة
//   isCompleted(i: number) { return i + 1 < this.currentStep; }

//   // 🔹 عند الضغط على "إنشاء"
//   submit() {
//     console.log('بيانات المشروع:', this.formData);
//     alert('تم إنشاء المشروع بنجاح ✅');
//   }
// }








// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------







import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/Core/services/data.service';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  currentStep = 1;
  @Output() close = new EventEmitter<void>();
  @Input() projectToEdit: any = null;
  @Input() isEditMode: boolean = false;

  closeStepper() {
    this.close.emit();
  }

  // 🔹 خطوات الـ Stepper
  steps = [
    { value: 1, label: 'معلومات أساسية', icon: 'pi pi-file' },
    { value: 2, label: 'المستندات', icon: 'pi pi-upload' },
    { value: 3, label: 'الوسيط والعمولة', icon: 'pi pi-dollar' },
    { value: 4, label: 'المقاولون', icon: 'pi pi-users' },
    { value: 5, label: 'مراجعة المشروع', icon: 'pi pi-check-circle' }
  ];

  // 🔹 الداتا اللى بتتبعت فى الآخر
  formData: any = {
    ProjectName: '',
    Description: '',
    ClientId: null,
    Location: '',
    StartDate: '',
    EndDate: '',
    Status: '',
    QuotationId: null,
    BrokerId: null,
    BrokerCommissionPercentage: '',
     Contractors: [
      {
        contractorId: '',
        contractAmount: 0,
        contractDescription: 'string',
        contractStartDate: 'string',
        contractEndDate: 'string',
        contractDetails: [
          {
            contractorId: '',
            index: 0,
            amount: 0,
            status: 'string',
            dateTime: 'string'
          }
        ]
      }
    ],
    Attachments: []
  };
  // store existing attachment filenames (for edit mode display / preservation)
  existingAttachments: string[] = [];
  // fallback names from server when IDs are not provided
  pendingClientName: string | null = null;
  pendingBrokerName: string | null = null;
  pendingContractorsNames: string[] = [];


  addContractor() {
    const nextIndex = this.formData.Contractors.length;
    this.formData.Contractors.push({
      contractorId: '',
      contractAmount: 0,
      contractDescription: '',
      contractStartDate: '',
      contractEndDate: '',
      contractDetails: [
        {
          contractorId: '',
          index: 0,
          amount: 0,
          status: '',
          dateTime: new Date().toISOString()
        }
      ]
    });
    // focus the newly added contractor select so user can pick immediately
    setTimeout(() => {
      try {
        const sel = document.querySelector(`.contractor-select[data-index="${nextIndex}"]`) as HTMLElement | null;
        if (sel) sel.focus();
      } catch (e) { /* noop */ }
    }, 60);
}

removeContractor(index: number) {
    if (this.formData.Contractors.length > 1) {
      this.formData.Contractors.splice(index, 1);
      // re-index contractDetails indexes for consistency
      this.formData.Contractors.forEach((c: any, idx: number) => {
        if (Array.isArray(c.contractDetails)) {
          c.contractDetails.forEach((d: any) => d.index = idx);
        }
      });
    }
}

  /**
   * Return a joined string of contractor labels based on current Contractors array
   * This maps contractorId values to the labels available in contractorsOptions.
   */
  getContractorLabels(): string {
    if (!Array.isArray(this.formData.Contractors) || this.formData.Contractors.length === 0) return 'غير محدد';
    const ids = this.formData.Contractors.map((c: any) => c.contractorId).filter((v: any) => v != null && v !== '');
    if (ids.length === 0) return 'غير محدد';
    const labels = this.contractorsOptions
      .filter(o => ids.includes(o.value))
      .map(o => o.label);
    return labels.length ? labels.join(', ') : 'غير محدد';
  }

  // payment status options (first option intentionally empty as you requested)
  paymentStatusOptions = [
    { label: '', value: '' },
    { label: 'قيد الإنتظار', value: 'Pending' },
    { label: 'مدفوعة', value: 'Paid' }
    // { label: 'جزئيا', value: 'Partial' }
  ];

  /** Add a payment (contractDetail) to a specific contractor */
  addPayment(contractorIndex: number) {
    const contractor = this.formData.Contractors[contractorIndex];
    if (!contractor) return;
    const nextIdx = contractor.contractDetails ? contractor.contractDetails.length : 0;
    contractor.contractDetails = contractor.contractDetails || [];
    contractor.contractDetails.push({
      contractorId: contractor.contractorId || 0,
      index: nextIdx,
      amount: 0,
      status: '',
      dateTime: new Date().toISOString()
    });
  }

  /** When user selects a contractor, sync contractorId into each contractDetail entry */
  onContractorChange(contractorIndex: number) {
    const contractor = this.formData.Contractors[contractorIndex];
    if (!contractor) return;
    const id = contractor.contractorId;
    if (Array.isArray(contractor.contractDetails)) {
      contractor.contractDetails.forEach((d: any) => d.contractorId = id);
    }
  }

  /** Remove a payment from a contractor, but keep at least one payment */
  deletePayment(contractorIndex: number, paymentIndex: number) {
    const contractor = this.formData.Contractors[contractorIndex];
    if (!contractor || !Array.isArray(contractor.contractDetails)) return;
    if (contractor.contractDetails.length <= 1) return; // disabled in UI
    contractor.contractDetails.splice(paymentIndex, 1);
    // re-index remaining payments
    contractor.contractDetails.forEach((d: any, idx: number) => d.index = idx);
  }

  /** Human-friendly Arabic label for a payment position (1 => الأولى, 2 => الثانية, ... ) */
  getPaymentLabel(pos: number): string {
    const map: Record<number, string> = {
      1: 'الأولى',
      2: 'الثانية',
      3: 'الثالثة',
      4: 'الرابعة',
      5: 'الخامسة',
      6: 'السادسة',
      7: 'السابعة',
      8: 'الثامنة',
      9: 'التاسعة',
      10: 'العاشرة'
    };
    return map[pos] || `الدفعة ${pos}`;
  }

  /** Sum of amounts for a contractor's payments */
  getPaymentsTotal(contractorIndex: number): number {
    const contractor = this.formData.Contractors[contractorIndex];
    if (!contractor || !Array.isArray(contractor.contractDetails)) return 0;
    return contractor.contractDetails.reduce((acc: number, d: any) => acc + (Number(d.amount) || 0), 0);
  }


  // 🔹 خيارات الـ dropdowns
  clientsOptions: any[] = [];
  quotationOptions: any[] = [];
  brokersOptions: any[] = [];
  contractorsOptions: any[] = [];

  // 🔹 الحالات ثابتة
  statusOptions = [
    { label: 'فى إنتظار الموافقة', value: 'PendingApproval' },
    { label: 'فى الإنتظار ', value: 'OnHold' },
    { label: 'قيد التنفيذ', value: 'InProgress' },
    { label: 'مكتمل', value: 'Completed' },
    { label: 'موافق عليه', value: 'Accepted' },
    { label: 'ملغى', value: 'Canceled' }
  ];



  constructor(private http: HttpClient, private dataService: DataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadClients();
    this.loadQuotations();
    this.loadBrokers();
    this.loadContractors();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectToEdit'] && this.projectToEdit) {
      this.populateFormForEdit(this.projectToEdit);
    }
    if (changes['isEditMode'] && !this.isEditMode) {
      // reset when leaving edit mode
      // optional: keep form as-is if user opened create instead
    }
  }

  private populateFormForEdit(p: any) {
    // map common fields from project object into formData shape
    this.currentStep = 1; // start at first step when editing
    this.formData.ProjectName = p.ProjectName ?? p.projectName ?? p.name ?? '';
    this.formData.Description = p.Description ?? p.description ?? p.desc ?? '';
    // try to set ClientId, or keep name for later mapping
    const clientId = p.ClientId ?? p.clientId ?? p.client?.id ?? null;
    if (clientId) {
      this.formData.ClientId = clientId;
    } else if (p.clientName || p.ClientName || p.client?.name) {
      this.pendingClientName = p.clientName ?? p.ClientName ?? p.client?.name ?? null;
      // attempt immediate mapping if clients already loaded
      const match = this.clientsOptions.find(c => String(c.label) === String(this.pendingClientName));
      if (match) this.formData.ClientId = match.value;
    } else {
      this.formData.ClientId = null;
    }
    this.formData.Location = p.Location ?? p.location ?? '';
    this.formData.StartDate = p.StartDate ?? p.startDate ?? '';
    this.formData.EndDate = p.EndDate ?? p.endDate ?? '';
    this.formData.Status = p.Status ?? p.status ?? '';
    this.formData.QuotationId = p.QuotationId ?? p.quotationId ?? null;
    const brokerId = p.BrokerId ?? p.brokerId ?? p.broker?.id ?? null;
    if (brokerId) {
      this.formData.BrokerId = brokerId;
    } else if (p.brokerName || p.BrokerName || p.broker?.name) {
      this.pendingBrokerName = p.brokerName ?? p.BrokerName ?? p.broker?.name ?? null;
      const m = this.brokersOptions.find(b => String(b.label) === String(this.pendingBrokerName));
      if (m) this.formData.BrokerId = m.value;
    } else {
      this.formData.BrokerId = null;
    }
    this.formData.BrokerCommissionPercentage = p.BrokerCommissionPercentage ?? p.brokerCommissionPercentage ?? '';

    // Contractors: try to map if present; otherwise keep default
    const contractorsSource = Array.isArray(p.Contractors) ? p.Contractors : (Array.isArray(p.contractors) ? p.contractors : []);
    if (contractorsSource.length) {
      this.formData.Contractors = contractorsSource.map((c: any, ci: number) => {
        const contractorId = c.contractorId ?? c.contractorId ?? c.contractorId ?? c.id ?? c.contractorId ?? c.contractor?.id ?? c.contractorId;
        const contractAmount = c.contractAmount ?? c.amount ?? c.contract_value ?? 0;
        const contractDescription = c.contractDescription ?? c.description ?? c.contractDescription ?? '';
        const contractStartDate = c.contractStartDate ?? c.startDate ?? c.contractStartDate ?? '';
        const contractEndDate = c.contractEndDate ?? c.endDate ?? c.contractEndDate ?? '';
        const contractDetailsSource = Array.isArray(c.contractDetails) ? c.contractDetails : (Array.isArray(c.contractDetailsDTOs) ? c.contractDetailsDTOs : []);
        const contractDetails = (contractDetailsSource.length ? contractDetailsSource : [{ contractorId: contractorId ?? 0, index: 0, amount: c.amount ?? 0, status: '', dateTime: new Date().toISOString() }])
          .map((d: any, di: number) => {
            return {
              contractorId: d.contractorId ?? d.contractorId ?? contractorId ?? 0,
              index: di,
              amount: d.amount ?? d.amountPaid ?? d.value ?? 0,
              status: d.status ?? d.paymentStatus ?? '',
              dateTime: d.dateTime ? this.normalizeDateString(d.dateTime) : (d.paymentDate ? this.normalizeDateString(d.paymentDate) : '')
            };
          });
        return {
          contractorId: contractorId ?? '',
          contractAmount: contractAmount,
          contractDescription: contractDescription,
          contractStartDate: contractStartDate ? this.normalizeDateString(contractStartDate) : '',
          contractEndDate: contractEndDate ? this.normalizeDateString(contractEndDate) : '',
          contractDetails: contractDetails
        };
      });
      // attempt to map contractor names to IDs if source contained names
      this.pendingContractorsNames = contractorsSource.map((c: any) => c.name ?? c.contractorName ?? c.contractor?.name).filter(Boolean) as string[];
      if (this.pendingContractorsNames.length && this.contractorsOptions.length) {
        // try mapping by label
        this.formData.Contractors.forEach((cObj: any, idx: number) => {
          const name = this.pendingContractorsNames[idx];
          const found = this.contractorsOptions.find(co => String(co.label) === String(name));
          if (found) cObj.contractorId = found.value;
        });
      }
    }

    // Attachments: preserve existing filenames (FileList cannot be set programmatically)
    this.existingAttachments = [];
    if (p.Attachments) {
      if (Array.isArray(p.Attachments)) {
        this.existingAttachments = p.Attachments.map((a: any) => (typeof a === 'string' ? a : (a.fileName ?? a.name ?? a.file)));
      } else if (typeof p.Attachments === 'string') {
        this.existingAttachments = [p.Attachments];
      }
    } else if (p.attachments) {
      if (Array.isArray(p.attachments)) this.existingAttachments = p.attachments.map((a: any) => (typeof a === 'string' ? a : (a.fileName ?? a.name ?? a.file)));
    }
    // keep formData.Attachments empty (user can add new files); existing filenames are tracked separately
  }

  // 🟢 تحميل العملاء
  loadClients() {
    this.dataService.GetAllClients().subscribe({
      next: (res) => {
        this.clientsOptions = res?.data || [];
        this.clientsOptions = this.clientsOptions.map((c: any) => ({ value: c.id, label: c.name }));
        console.log('عملاء محملين:', this.clientsOptions);
        // if we have a pending client name from project data, try to map it now
        if (this.pendingClientName) {
          const match = this.clientsOptions.find(c => String(c.label) === String(this.pendingClientName));
          if (match) this.formData.ClientId = match.value;
        }
      },
      // error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل العروض' })
      error: (err) => console.error('خطأ في تحميل عروض الأسعار:', err)
    });
  }

  // 🟡 تحميل عروض الأسعار
  loadQuotations() {
    this.dataService.GetAllQuotations().subscribe({
      next: (res) => {
        this.quotationOptions = res?.data || [],
          this.quotationOptions = this.quotationOptions.map((q: any) => ({ value: q.id, label: q.title }));
        console.log('عروض أسعار محملة:', this.quotationOptions);
      },
      // error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل العروض' })
      error: (err) => console.error('خطأ في تحميل عروض الأسعار:', err)
    });
  }

  // 🟣 تحميل الوسطاء
  loadBrokers() {
    this.dataService.GetAllBrokers().subscribe({
      next: (res) => {
        this.brokersOptions = res?.data || [],
          this.brokersOptions = this.brokersOptions.map((b: any) => ({ value: b.id, label: b.name }));
        console.log('الوسطاء المحملون:', this.brokersOptions);
        if (this.pendingBrokerName) {
          const m = this.brokersOptions.find(b => String(b.label) === String(this.pendingBrokerName));
          if (m) this.formData.BrokerId = m.value;
        }
      },
      // error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل العروض' })
      error: (err) => console.error('خطأ في تحميل عروض الوسطاء:', err)
    });
  }

  // 🔵 تحميل المقاولين
  loadContractors() {
    this.dataService.GetAllContractor().subscribe({
      next: (res) => {
        this.contractorsOptions = res?.data || [],
          this.contractorsOptions = this.contractorsOptions.map((c: any) => ({ value: c.id, label: c.name }));
        console.log('المقاولون المحملون:', this.contractorsOptions);
        if (this.pendingContractorsNames && this.pendingContractorsNames.length) {
          // map pending names to contractor IDs where possible
          this.formData.Contractors.forEach((cObj: any, idx: number) => {
            const name = this.pendingContractorsNames[idx];
            const found = this.contractorsOptions.find(co => String(co.label) === String(name));
            if (found) cObj.contractorId = found.value;
          });
        }
      },
      // error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل العروض' })
      error: (err) => console.error('خطأ في تحميل عروض المقاولون:', err)
    });
  }


  // 📁 عند اختيار ملف
  onFileSelect(event: any) {
    // keep the full FileList to allow multiple uploads
    this.formData.Attachments = event.target.files;
  }

  // 🔹 التنقل بين الخطوات
  goTo(step: number) { this.currentStep = step; }
  next() { if (this.currentStep < this.steps.length) this.currentStep++; }
  prev() { if (this.currentStep > 1) this.currentStep--; }

  // 🔹 تحديد الخطوات المكتملة
  isCompleted(i: number) { return i + 1 < this.currentStep; }

  // 🔹 الإرسال النهائي
  submit() {
    const form = this.buildFormData();
    if (this.isEditMode) {
      // include project id if available
      const id = this.projectToEdit?.Id ?? this.projectToEdit?.id ?? this.projectToEdit?.projectId ?? null;
      if (id) form.append('Id', String(id));
      this.dataService.EditProject(form).subscribe({
        next: (res) => {
          if (res?.isValid) {
            this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم تعديل المشروع بنجاح' });
            this.closeStepper();
          } else {
            this.messageService.add({ severity: 'warn', summary: 'تحذير', detail: res?.message || 'فشل التعديل' });
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء التعديل' });
        }
      });
    } else {
      this.dataService.AddProject(form).subscribe({
        next: (res) => {
          if (res?.isValid) {
            this.messageService.add({ severity: 'success', summary: 'تم', detail: 'تم إضافة المشروع بنجاح' });
            this.closeStepper();
          } else {
            this.messageService.add({ severity: 'warn', summary: 'تحذير', detail: res?.message || 'فشل الإضافة' });
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الإضافة' });
        }
      });
    }
    // print sanitized payload so you can inspect before sending to server
    // console.log('📦 Prepared Project payload for API:', payload);
    // TODO: replace alert with proper UI notification when integrated
    // alert('تم إنشاء المشروع بنجاح ✅ (راجع الكونسول للـ payload)');
    // if you want, here we can call a DataService method to send `payload` to the backend
  }

  /**
   * Prepare and normalize `formData` into a payload shape ready for API submission.
   * - converts numeric-like strings to numbers
   * - ensures contractDetails indices and date format (YYYY-MM-DD)
   */
  preparePayloadForApi(): any {
    const clone = JSON.parse(JSON.stringify(this.formData || {}));
    const toNumberIfNumeric = (v: any) => {
      if (v === null || v === undefined || v === '') return v;
      const n = Number(v);
      return Number.isFinite(n) ? n : v;
    };

    // normalize top-level ids/nums
    clone.ClientId = toNumberIfNumeric(clone.ClientId);
    clone.QuotationId = toNumberIfNumeric(clone.QuotationId);
    clone.BrokerId = toNumberIfNumeric(clone.BrokerId);
    clone.BrokerCommissionPercentage = toNumberIfNumeric(clone.BrokerCommissionPercentage);

    // normalize contractors
    clone.Contractors = (clone.Contractors || []).map((c: any, ci: number) => {
      const cc: any = { ...c };
      cc.contractorId = toNumberIfNumeric(cc.contractorId);
      cc.contractAmount = toNumberIfNumeric(cc.contractAmount);
      // ensure contractDetails array
      cc.contractDetails = (cc.contractDetails || []).map((d: any, di: number) => {
        const dd: any = { ...d };
        dd.contractorId = toNumberIfNumeric(dd.contractorId);
        dd.index = di; // re-index to be safe
        dd.amount = toNumberIfNumeric(dd.amount);
        dd.status = dd.status || '';
        // normalize date to YYYY-MM-DD if possible
        if (dd.dateTime) {
          // if already YYYY-MM-DD keep it, otherwise convert
          if (typeof dd.dateTime === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dd.dateTime)) {
            // keep
          } else {
            const dt = new Date(dd.dateTime);
            if (!isNaN(dt.getTime())) dd.dateTime = dt.toISOString().split('T')[0];
          }
        } else {
          dd.dateTime = '';
        }
        return dd;
      });
      return cc;
    });

    // attachments: convert File -> filename array for now
    if (clone.Attachments) {
      if (Array.isArray(clone.Attachments)) {
        clone.Attachments = clone.Attachments.map((f: any) => (f && f.name) ? f.name : f);
      } else if (clone.Attachments.name) {
        clone.Attachments = [clone.Attachments.name];
      }
    } else {
      clone.Attachments = [];
    }

    return clone;
  }

  /** Build FormData with individual fields (like clients component) */
  buildFormData(): FormData {
    const payload = this.preparePayloadForApi();
    const fd = new FormData();

    // append primitive/top-level fields individually (matching server expectations)
    const topFields = [
      'ProjectName', 'Description', 'ClientId', 'Location', 'StartDate', 'EndDate',
      'Status', 'QuotationId', 'BrokerId', 'BrokerCommissionPercentage'
    ];
    topFields.forEach((k) => {
      const v = (payload as any)[k];
      if (v !== undefined && v !== null) fd.append(k, String(v));
    });

    // append Contractors as JSON string (server can parse this)
    if (Array.isArray(payload.Contractors)) {
      fd.append('Contractors', JSON.stringify(payload.Contractors));
    }

    // preserve existing attachment filenames when editing (server can keep them)
    if (this.existingAttachments && this.existingAttachments.length) {
      fd.append('ExistingAttachments', JSON.stringify(this.existingAttachments));
    }

    // Attach files (if any) — append each under 'Attachments' key
    const files = this.formData.Attachments;
    if (files) {
      if ((files as FileList).length !== undefined) {
        for (let i = 0; i < (files as FileList).length; i++) {
          const f = (files as FileList)[i];
          if (f) fd.append('Attachments', f, f.name);
        }
      } else if (Array.isArray(files)) {
        (files as any[]).forEach((f: File) => fd.append('Attachments', f, f.name));
      }
    }

    return fd;
  }


  getLabelByValue(options: any[], value: any) {
    if (value == null || value === '') return 'غير محدد';
    const match = options.find(o => String(o.value) === String(value));
    return match ? match.label : 'غير محدد';
  }

  getMultipleLabels(options: any[], values: any[]) {
    if (!values || values.length === 0) return 'غير محدد';
    return options.filter(o => values.includes(o.value)).map(o => o.label).join(', ');
  }

  /** Normalize various date representations into YYYY-MM-DD or empty string */
  normalizeDateString(d: any): string {
    if (!d && d !== 0) return '';
    if (d instanceof Date) return d.toISOString().split('T')[0];
    if (typeof d === 'string') {
      const m = d.match(/^(\d{4}-\d{2}-\d{2})/);
      if (m) return m[1];
      const dt = new Date(d);
      if (!isNaN(dt.getTime())) return dt.toISOString().split('T')[0];
      return d;
    }
    // fallback to number -> treat as timestamp
    const n = Number(d);
    if (!isNaN(n)) {
      const dt = new Date(n);
      if (!isNaN(dt.getTime())) return dt.toISOString().split('T')[0];
    }
    return '';
  }

validateCommission(event: any) {
  const value = event.target.value;
  if (value < 1) {
    event.target.value = 1;
    this.formData.commissionRate = 1;
  } else if (value > 60) {
    event.target.value = 60;
    this.formData.commissionRate = 60;
  } else {
    this.formData.commissionRate = value;
  }
}

}
