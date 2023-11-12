
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs'
import { constant } from './contant';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData : BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    this.setUserData();
   }

  login(data:any):Observable<any>
  {
    return this._HttpClient.post(`${constant.baseURL}/api/v1/users/signIn` , data)
  }

  signUp(data:any):Observable<any>
  {
    return this._HttpClient.post(`${constant.baseURL}/api/v1/users/signUp` , data)
  }

  setUserData()
  {
    if(localStorage.getItem(constant.token))
    {
      let token = localStorage.getItem(constant.token);
      if(token != null)
      {
        var decode = jwtDecode(token);
        this.userData.next(decode);
        constant.userToken = token;
      }

    }
  }

  logout()
  {
    localStorage.removeItem(constant.token);
    this._Router.navigate(['login']);

    this.userData.next(null);
  }
}
