// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request);
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../services/loading.service'; // خدمة اللودينج اللى بتتحكم فى السبينر

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ✅ 1. إضافة الـ token
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // ✅ 2. تشغيل الـ spinner
    this.loadingService.show();

    return next.handle(request).pipe(
      // ✅ 3. معالجة الأخطاء
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'حدث خطأ ما!';

        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          errorMessage = 'خطأ في الاتصال بالسيرفر.';
        } else if (error.status === 401) {
          errorMessage = 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى.';
        }

        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: errorMessage
        });

        return throwError(() => error);
      }),

      // ✅ 4. إيقاف الـ spinner بعد ما الطلب يخلص
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}

