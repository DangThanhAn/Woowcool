import { OrderDetail } from './../models/OrderDetail';
import { Order } from './../models/Order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { CartDetail } from '../models/CartDetails';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private http : HttpClient
  ) { }
  url : string = "https://localhost:7122/api/Cart";
  public addToCart(cartDetail: CartDetail):Observable<any>{
    return this.http.post<any>(`${this.urlUpdateSize}/CreateCartDetail`,cartDetail);
  }

  public updateAProduct(product: Product , id: number):Observable<any>{
    return this.http.put<any>(`${this.url}/`+id,product);
  }
  public deleteAProduct(id: number):Observable<any>{
    return this.http.delete<any>(`${this.url}/`+id);
  }

  public GetNumberInCart(userId: number):Observable<any>{
    return this.http.get<any>(`${this.url}/GetNumberInCart?userId=${userId}`);
  }

  public getAllItemsInCart():Observable<any>{
    return this.http.get<any>(this.url);
  }
  public clearCart(cartId:number) {
    return this.http.delete(`${this.urlUpdateSize}/ClearCart?cartId=${cartId}`);
  }

  public getCart(userId:number):Observable<any>{
    return this.http.get<any>(`${this.url}?userId=${userId}`);
  }

  public updateTotalPrice(cartId:number,totalPrice:number):Observable<any>{
    return this.http.put<any>(`${this.url}/UpdateTotalPrice?id=${cartId}&totalPrice=${totalPrice}`,{cartId,totalPrice});
  }

  urlUpdateSize='https://localhost:7122/api/CartDetails';
  public updateSize(cartDetailId:number,quanlity:number):Observable<any>{
    return this.http.get<any>(`${this.urlUpdateSize}/UpdateQuantity?cartDetailId=${cartDetailId}&quantity=${quanlity}`);
  }
  public updateSizePr(cartDetailId:number,size:string):Observable<any>{
    return this.http.get<any>(`${this.urlUpdateSize}/UpdateSize?cartDetailId=${cartDetailId}&size=${size}`);
  }
  public deleteCD(cartDetailId:number):Observable<any>{
    return this.http.delete<any>(`${this.urlUpdateSize}?cartDetailId=${cartDetailId}`);
  }

  // Click Submit
  public createOrder(Order:Order):Observable<any>{
    return this.http.post<any>(`${this.url}/Order`,Order);
  }
  public createOrderDetails(OrderDetail:OrderDetail):Observable<any>{
    return this.http.post<any>(`${this.url}/OrderDetails`,OrderDetail);
  }
  // Cập nhật lại số lượng ở bảng sản phẩm và size
  public UpdateQuantityAvailible(OrderDetail:OrderDetail):Observable<any>{
    return this.http.put<any>(`https://localhost:7122/api/Products/ReUpdateQuantity`,OrderDetail);
  }
}
