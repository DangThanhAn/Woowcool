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
  private apiUrl = 'https://localhost:7122/api/Auth';
  private jwtHelper = new JwtHelperService();
  private token: string | any;
  authenticated : boolean = false;
  currentUser: any;
  constructor(private http: HttpClient) {}
  register(value: object){
    return this.http.post('https://localhost:7122/api/Users',value,{withCredentials:true});
  }
  login(value:object): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/login`, value,{withCredentials:true})
      .pipe(
        map(result => {
          this.token = result;
          localStorage.setItem('access_token', this.token.token);
          return true;
        })
      );
  }
  getCurrentUser(){
    let token = localStorage.getItem('access_token');
    if(token == null || token == ""){
      token = "";
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
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
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
