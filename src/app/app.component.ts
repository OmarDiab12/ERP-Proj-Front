import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from './Core/services/user-data.service';
import { LoadingService } from './Core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading$ = this.loadingService.loading$;
  title = 'ERP';

  constructor(private userService: UserDataService, private router: Router,private loadingService: LoadingService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.userService.isTokenExpired()) {
        // لو التوكن انتهت صلاحيته → logout فوري
        this.userService.logOut();
      } else {
        // لو صالحة → خزّن بيانات المستخدم
        this.userService.saveUserData();
      }
    }

    // ✅ تحقق مستمر كل دقيقة (اختياري)
    setInterval(() => {
      if (this.userService.isTokenExpired()) {
        this.userService.logOut();
      }
    }, 60000); // كل دقيقة
  }
}
