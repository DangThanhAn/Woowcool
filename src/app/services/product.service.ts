import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from "../models/productType";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(
    private httpClient: HttpClient
  ) {
  }

  productTypeUrl:string ='https://localhost:7122/api/ProductTypes';
  public getProductType(): Observable<any> {
    return this.httpClient.get<ProductType>(this.productTypeUrl);
  }

  public getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(this.dataUrlOnline);
  }

  dataUrlOnline:string = "https://localhost:7122/api/Products";
  public getAllProductsv1(): Observable<any> {
    return this.httpClient.get<any>(this.dataUrlOnline);
  }


  getProductsSmall() {
    return this.httpClient.get<any>(this.dataUrlOnline);
}

getProducts() {
    return this.httpClient.get<any>(this.dataUrlOnline);
}

getProductsMixed() {
    return this.httpClient.get<any>(this.dataUrlOnline);
}

getProductsWithOrdersSmall() {
    return this.httpClient.get<any>(this.dataUrlOnline);
}



}
