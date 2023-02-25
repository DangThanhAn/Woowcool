import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import * as jwt from 'jsonwebtoken';
export interface LoginResponse {
  access_token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  public setToken(token:string){
    if(!token){
      this.removeToken();
      return;
    }
    localStorage.setItem('token',token);
  }

  public removeToken(){
    localStorage.removeItem('token');
  }
}
