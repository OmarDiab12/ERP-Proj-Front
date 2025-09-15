import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/Core/services/user-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
loading = false;
  error: string = "";
  loginForm: FormGroup
  constructor(private db: FormBuilder, private Router: Router, private _UserDataService: UserDataService) {
    this.loginForm = db.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
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

    this._UserDataService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response?.isValid && response?.data?.token) {
          localStorage.setItem('token', response.data.token);
          this._UserDataService.saveUserData();

          const role = (this._UserDataService.role || '').toLowerCase();

            if (role === 'admin') {
              this.Router.navigate(['/dashboard']);
            } else {
              this.Router.navigate(['/']);
            }
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

}
