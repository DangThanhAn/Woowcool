import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private http : HttpClient
  ) { }
  url : string = "https://localhost:7122/api/Cart";
  public addToCart(product: Product):Observable<any>{
    return this.http.post<any>(this.url,product);
  }

  public updateAProduct(product: Product , id: number):Observable<any>{
    return this.http.put<any>(`${this.url}/`+id,product);
  }
  public deleteAProduct(id: number):Observable<any>{
    return this.http.delete<any>(`${this.url}/`+id);
  }

  public getAllItemsInCart():Observable<any>{
    return this.http.get<any>(this.url);
  }
  public clearCart() {
    return this.http.delete(this.url);
  }

  public getCart(userId:number):Observable<any>{
    return this.http.get<any>(`${this.url}?userId=${userId}`);
  }
  urlUpdateSize='https://localhost:7122/api/CartDetails';
  public updateSize(cartDetailId:number,quanlity:number):Observable<any>{
    return this.http.get<any>(`${this.urlUpdateSize}?cartDetailId=${cartDetailId}&quantity=${quanlity}`);
  }
  public deleteCD(cartDetailId:number):Observable<any>{
    return this.http.delete<any>(`${this.urlUpdateSize}?cartDetailId=${cartDetailId}`);
  }
}
