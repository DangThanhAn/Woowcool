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
  url : string = "http://localhost:3000/cart";
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
}
