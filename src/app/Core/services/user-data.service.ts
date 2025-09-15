import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
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
  back: string = "https://aubs.runasp.net/api/"
  constructor(private HttpClient:HttpClient,private Router:Router) {}

  saveUserData(){
    if(localStorage.getItem('token') !=null){
      let encodeToken:any = localStorage.getItem('token');
      let decodeToken = jwtDecode(encodeToken);
      this.userData=decodeToken;
      this.id=this.userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      this.role=this.userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      this.email=this.userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
      this.name=this.userData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      // Store role in lowercase for consistency
      localStorage.setItem("role", (this.role || '').toLowerCase());
      localStorage.setItem("name",this.name)
    }
  }

getCurrentUserId(): number {
  return this.id ? Number(this.id) : 0;
}

  registerStudent(data:object):Observable<any>{
    // return this.HttpClient.post(this.back+'User/register-student',data,
    //   {
    //     context: new HttpContext().set(SUCCESS_MESSAGE, 'Applied successfully and waiting for approval 🎉')
    //   });
    return this.HttpClient.post(this.back+'User/register-student',data,{});
  }

  AddUser(data:object):Observable<any>{
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    return this.HttpClient.post(this.back+'User/create-user-by-admin',data,{headers});
  }

  login(data:object):Observable<any>{
    // return this.HttpClient.post(this.back+'User/login',data,
    // {
    //   context: new HttpContext()
    //     .set(DISABLE_SWAL, true)
    //     .set(DISABLE_SPINNER, true)
    // });
    return this.HttpClient.post(this.back+'User/login',data,{});
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

  isStudent(): boolean {
    return (this.role || '').toLowerCase() === 'student';
  }

  getRoleFromStorage(): void {
    this.role = localStorage.getItem('role');
  }
  // new
getRole(): string | null {
  return localStorage.getItem('role'); // Or however role is stored
}

}
