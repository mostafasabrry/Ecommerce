import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
   router=inject(Router);
  userDataToken:any;

  sendRegisterData(data:object):Observable<any>{
      return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,data)
  }
  sendLoginData(data:object):Observable<any>{
      return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,data)
  }
  saveUserTokenData(){
    if(localStorage.getItem('userToken')!==null){
       this.userDataToken=jwtDecode(localStorage.getItem('userToken')!)
    }
  }

  SignOut(){
    localStorage.removeItem('userToken');
    this.userDataToken=null;
    this.router.navigate(['/login']);
  }

  setVerifyEmail(data:object):Observable<any>{
      return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,data);
  }
  setVerifyCode(data:object):Observable<any>{
      return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,data);
  }
  setVerifyPassword(data:object):Observable<any>{
      return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,data);
  }
}
