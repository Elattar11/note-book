import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs'
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { constant } from '../contant';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }

  addNote(data : any):Observable<any>
  {
    return this._HttpClient.post(`${constant.baseURL}/api/v1/notes` , data , {headers:{
      token : constant.bearer + constant.userToken
    }});
  }

  getNotes():Observable<any>
  {
    return this._HttpClient.get(`${constant.baseURL}/api/v1/notes` , {headers:{
      token : constant.bearer + constant.userToken
    }});
  }

  updateNote(data : any , id:any):Observable<any>
  {
    return this._HttpClient.put(`${constant.baseURL}/api/v1/notes/${id}`,data , {headers:{
      token : constant.bearer + constant.userToken
    }});
  }

  deleteNote(id:any):Observable<any>
  {
    return this._HttpClient.delete(`${constant.baseURL}/api/v1/notes/${id}` , {headers:{
      token : constant.bearer + constant.userToken
    }});
  }

}
