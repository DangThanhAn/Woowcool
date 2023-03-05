import { Emitters } from './../../emitters/emitters';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private jwtHelper = new JwtHelperService();
  private token: string | any;
  authenticated : boolean = false;

  user(){
    return this.http.get(`${this.apiUrl}/user`,{withCredentials:true})
  }
  constructor(private http: HttpClient) {}
  register(value: object){
    return this.http.post(`${this.apiUrl}/register`,value,{withCredentials:true});
  }
  login(value:object): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/login`, value,{withCredentials:true})
      .pipe(
        map(result => {
          this.token = result;
          localStorage.setItem('access_token', this.token.token);
          console.log( this.token.token);
          return true;
        })
      );
  }

  logout(): Observable<any>{
    this.token = null;
    localStorage.removeItem('access_token');
    return this.http.post(`${this.apiUrl}/logout`, {},{withCredentials:true});
  }
  data: any
  isAdmin(): boolean {
    return false;
  }
  public isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
