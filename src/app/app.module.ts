import { LOCALE_ID, NgModule } from '@angular/core';
import localeAr from '@angular/common/locales/ar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './Core/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // ⬅️ لازم
import { CommonModule, registerLocaleData } from '@angular/common'; // ⬅️ مهم للـ directives زي ngIf/ngFor
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ArabicDigitsPipe } from './Core/Pipes/arabic-digits.pipe';


registerLocaleData(localeAr);


@NgModule({
  declarations: [
    AppComponent,
    ArabicDigitsPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // ⬅️ أضف ده
    CommonModule,            // ⬅️ وأضف ده
    AppRoutingModule,
    AdminModule,
    ToastModule,
    ProgressSpinnerModule, // ✅ أضف الموديول هنا
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'ar' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
