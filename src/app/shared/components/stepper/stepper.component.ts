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







import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/Core/services/data.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  currentStep = 1;
  @Output() close = new EventEmitter<void>();

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
    projectName: '',
    clientId: null,
    location: '',
    status: '',
    description: '',
    quotationId: null,
    file: null,
    brokerId: null,
    commissionRate: '',
    contractors: []
  };

  // 🔹 خيارات الـ dropdowns
  clientsOptions: any[] = [];
  quotationOptions: any[] = [];
  brokersOptions: any[] = [];
  contractorsOptions: any[] = [];

  // 🔹 الحالات ثابتة
  statusOptions = [
    { label: 'قيد التنفيذ', value: 'قيد التنفيذ' },
    { label: 'مكتمل', value: 'مكتمل' },
    { label: 'ملغي', value: 'ملغي' }
  ];

  // رابط الـ API الأساسى
  back = 'https://aubs.runasp.net/api/';

  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    this.loadClients();
    this.loadQuotations();
    this.loadBrokers();
    this.loadContractors();
  }

  // 🟢 تحميل العملاء
  loadClients() {
    // this.GetAllClients().subscribe({
    //   next: (res: any) => {
    //     this.clientsOptions = res?.data?.items?.map((c: any) => ({
    //       label: c.name,
    //       value: c.id
    //     })) || [];
    //   },
    //   error: err => console.error('خطأ في تحميل العملاء:', err)
    // });
    this.dataService.GetAllClients().subscribe({
      next: (res) => { this.clientsOptions = res?.data || [];
        this.clientsOptions = this.clientsOptions.map((c: any) => ({ value: c.id, label: c.name }));
        console.log('عملاء محملين:', this.clientsOptions);
      },
      // error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل العروض' })
      error: (err) => console.error('خطأ في تحميل عروض الأسعار:', err)
    });
  }

  // 🟡 تحميل عروض الأسعار
  loadQuotations() {
    // this.GetAllQuotations().subscribe({
    //   next: (res: any) => {
    //     this.quotationOptions = res?.data?.items?.map((q: any) => ({
    //       label: q.title,
    //       value: q.id
    //     })) || [];
    //   },
    //   error: err => console.error('خطأ في تحميل عروض الأسعار:', err)
    // });
    this.dataService.GetAllQuotations().subscribe({
      next: (res) =>{
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
    // this.GetAllBrokers().subscribe({
    //   next: (res: any) => {
    //     this.brokersOptions = res?.data?.items?.map((b: any) => ({
    //       label: b.name,
    //       value: b.id
    //     })) || [];
    //   },
    //   error: err => console.error('خطأ في تحميل الوسطاء:', err)
    // });
    this.dataService.GetAllBrokers().subscribe({
      next: (res) =>{
       this.brokersOptions = res?.data || [],
        this.brokersOptions = this.brokersOptions.map((b: any) => ({ value: b.id, label: b.name }));
      console.log('الوسطاء المحملون:', this.brokersOptions);
      },
      // error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل العروض' })
      error: (err) => console.error('خطأ في تحميل عروض الوسطاء:', err)
    });
  }

  // 🔵 تحميل المقاولين
  loadContractors() {
    // this.GetAllContractor().subscribe({
    //   next: (res: any) => {
    //     this.contractorsOptions = res?.data?.items?.map((con: any) => ({
    //       label: con.name,
    //       value: con.id
    //     })) || [];
    //   },
    //   error: err => console.error('خطأ في تحميل المقاولين:', err)
    // });
    this.dataService.GetAllContractor().subscribe({
      next: (res) => {
        this.contractorsOptions = res?.data || [],
        this.contractorsOptions = this.contractorsOptions.map((c: any) => ({ value: c.id, label: c.name }));
      console.log('المقاولون المحملون:', this.contractorsOptions);
      },
      // error: () => this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'فشل تحميل العروض' })
      error: (err) => console.error('خطأ في تحميل عروض المقاولون:', err)
    });
  }

  // // ✅ الخدمات
  // GetAllClients(): Observable<any> {
  //   return this.http.post(this.back + 'Clients/get-all', {});
  // }

  // GetAllQuotations(): Observable<any> {
  //   return this.http.post(this.back + 'Quotations/get-all', {});
  // }

  // GetAllBrokers(): Observable<any> {
  //   return this.http.post(this.back + 'Broker/get-all', {});
  // }

  // GetAllContractor(): Observable<any> {
  //   return this.http.post(this.back + 'Contractor/get-all', {});
  // }

  // 📁 عند اختيار ملف
  onFileSelect(event: any) {
    this.formData.file = event.target.files[0];
  }

  // 🔹 التنقل بين الخطوات
  goTo(step: number) { this.currentStep = step; }
  next() { if (this.currentStep < this.steps.length) this.currentStep++; }
  prev() { if (this.currentStep > 1) this.currentStep--; }

  // 🔹 تحديد الخطوات المكتملة
  isCompleted(i: number) { return i + 1 < this.currentStep; }

  // 🔹 الإرسال النهائي
  submit() {
    console.log('📦 بيانات المشروع:', this.formData);
    alert('تم إنشاء المشروع بنجاح ✅');
  }







//   getLabelByValue(options: any[], value: any) {
//   return options.find(o => o.value === value)?.label || 'غير محدد';
// }
getLabelByValue(options: any[], value: any) {
  if (value == null || value === '') return 'غير محدد';
  const match = options.find(o => String(o.value) === String(value));
  return match ? match.label : 'غير محدد';
}

getMultipleLabels(options: any[], values: any[]) {
  if (!values || values.length === 0) return 'غير محدد';
  return options.filter(o => values.includes(o.value)).map(o => o.label).join(', ');
}
}
