import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Review } from '../models/Review';
import { Observable } from 'rxjs';
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

  checkout='https://localhost:7122/api/Checkout';
  getDataCheckout(userId:number){
    return this.http.get(`${this.checkout}?userId=${userId}`);
  }
  order='https://localhost:7122/api/Orders';
  GetDetailsByOrderId(orderId:number){
    return this.http.get(`${this.order}/GetDetailsByOrderId?orderId=${orderId}`);
  }
  GetAllOrderHistoryByUserId(userId:number){
    return this.http.get(`${this.order}/GetAllOrderHistoryByUserId?userId=${userId}`);
  }

  review="https://localhost:7122/api/Reviews";
  postReview(myComment:Review){
    return this.http.post(`${this.review}`,myComment);
  }
  getReviewById(userId:number){
    return this.http.get(`${this.review}?userId=${userId}`);
  }
  editReviewById(reviewId:number,myComment:any){
    return this.http.put(`${this.review}/EditReview?id=${reviewId}`,myComment);
  }
  //Cap nhat thong tin nguoi dung
  userUrl="https://localhost:7122/api/Users";
  updateInforUser(userId:number,user:any){
    return this.http.put(`${this.userUrl}/${userId}`,user);
  }
  //get user info by id
  getInforUserById(userId:number):Observable<any>{
    return this.http.get(`${this.userUrl}/${userId}`);
  }

}
