import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwtHelper = new JwtHelperService();
  constructor(private http:HttpClient) {}

  getUserFromToken(token: string): any {
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken);
    return decodedToken;
  }

  cartUrl ='https://localhost:7122/api/Cart';
  getCart(userId:number){
    return this.http.get(`${this.cartUrl}?cartId=${userId}`);
  }
}
