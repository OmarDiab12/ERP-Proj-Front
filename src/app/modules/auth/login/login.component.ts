import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/Core/services/user-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  loading = false;
  error: string = "";
  showPassword: boolean = false;
  loginForm: FormGroup
  private returnUrl: string | null = null;
  constructor(private db: FormBuilder, private Router: Router, private route: ActivatedRoute, private _UserDataService: UserDataService) {
    this.loginForm = db.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    // capture returnUrl if guard redirected to login
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }
  get email() {
    return this.loginForm.get("email")
  }
  get password() {
    return this.loginForm.get("password")
  }

  Submit() {
    if (this.loginForm.valid) {
      this.loading = true;
      console.log(this.loginForm.value)
      this._UserDataService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response?.isValid && response?.data?.token) {
            localStorage.setItem('token', response.data.token);
            this._UserDataService.saveUserData();
            this.Router.navigateByUrl('/admin/dashboard');

            // const role = (this._UserDataService.role || '').toLowerCase();
            // If a returnUrl was provided (guard redirect), go there. Otherwise keep existing role-based navigation.
            // const destination = this.returnUrl ? this.returnUrl : (role === 'admin' ? '/dashboard' : '/');
            // Use navigateByUrl to preserve full paths like /admin/dashboard
            // this.Router.navigateByUrl(destination);
          } else {
            this.loading = false;
            this.error = response.error || "Invalid login credentials";
          }
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.error = "Login request failed";
        }
      });
    } else {
      this.error = "Please fill out the form correctly.";
    }
  }


//   Submit() {
//   if (this.loginForm.valid) {
//     this.loading = true;
//     console.log('Form Value:', this.loginForm.value);

//     this._UserDataService.login(this.loginForm.value).subscribe({
//       next: (response) => {
//         console.log('Login response:', response);

//         if (response?.isValid && response?.data?.token) {
//           localStorage.setItem('token', response.data.token);
//           this._UserDataService.saveUserData();

//           const role = (this._UserDataService.role || '').toLowerCase();
//           const destination = this.returnUrl
//             ? this.returnUrl
//             : role === 'admin'
//             ? '/dashboard'
//             : '/';

//           console.log('Navigating to:', destination);
//           this.Router.navigateByUrl(destination).then((navResult) => {
//             console.log('Navigation result:', navResult);
//             this.loading = false;
//           });
//         } else {
//           this.loading = false;
//           this.error = response.error || 'Invalid login credentials';
//         }
//       },
//       error: (err: HttpErrorResponse) => {
//         console.error('Login error:', err);
//         this.loading = false;
//         this.error = 'Login request failed';
//       },
//     });
//   } else {
//     this.error = 'Please fill out the form correctly.';
//   }
// }

}
