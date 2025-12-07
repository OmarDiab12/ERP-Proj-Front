import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { SUCCESS_MESSAGE, DISABLE_SWAL, DISABLE_SPINNER } from './http.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userData:any;
  role:any="";
  name:string="";
  email:string="";
  id:string="";
  private readonly apiBase = environment.apiBaseUrl;
  private readonly endpoints = environment.endpoints.auth;
  constructor(private HttpClient:HttpClient,private Router:Router) {}


  isTokenExpired(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return true;

  try {
    const decoded: any = jwtDecode(token);
    const exp = decoded['exp'];
    if (!exp) return true;

    const now = Date.now().valueOf() / 1000; // الوقت الحالي بالثواني
    return exp < now; // true لو انتهى
  } catch (e) {
    console.error('Invalid token:', e);
    return true;
  }
}

  // saveUserData(){
  //   if(localStorage.getItem('token') !=null){

  //     if (this.isTokenExpired()) {
  //     this.logOut();
  //     return;
  //   }


  //     let encodeToken:any = localStorage.getItem('token');
  //     let decodeToken = jwtDecode(encodeToken);
  //     this.userData=decodeToken;
  //     console.log(this.userData)
  //     this.id=this.userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  //     this.role=this.userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  //     this.email=this.userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  //     this.name=this.userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  //     // Store role in lowercase for consistency
  //     localStorage.setItem("role", (this.role || '').toLowerCase());
  //     localStorage.setItem("name",this.name)
  //   }
  // }

  saveUserData() {
  const token = localStorage.getItem('token');
  if (token) {
    if (this.isTokenExpired()) {
      this.logOut();
      return;
    }

    const decoded: any = jwtDecode(token);
    this.userData = decoded;
    this.id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    this.role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 'admin'; // fallback مؤقت
    this.email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    this.name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

    // Store role in lowercase for consistency
    localStorage.setItem("role", (this.role || 'admin').toLowerCase());
    localStorage.setItem("name", this.name);
  }
}


getCurrentUserId(): number {
  return this.id ? Number(this.id) : 0;
}

  registerStudent(data:object):Observable<any>{
    return this.HttpClient.post(this.apiBase + this.endpoints.registerStudent,data,{});
  }

  login(data:object):Observable<any>{
    // return this.HttpClient.post(this.back+'User/login',data,
    // {
    //   context: new HttpContext()
    //     .set(DISABLE_SWAL, true)
    //     .set(DISABLE_SPINNER, true)
    // });
    return this.HttpClient.post(this.apiBase + this.endpoints.login,data,{});
  }

  logOut(){
    this.role='';
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("name")
    this.Router.navigate(['/login'])
  }

  isAdmin(): boolean {
    return (this.role || '').toLowerCase() === 'admin';
  }

  isInstructor(): boolean {
    return (this.role || '').toLowerCase() === 'instructor';
  }

  getRoleFromStorage(): void {
    this.role = localStorage.getItem('role');
  }
  // new
getRole(): string | null {
  return localStorage.getItem('role'); // Or however role is stored
}

}
