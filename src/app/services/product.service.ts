import { Image, Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from '../models/productType';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  productTypeUrl: string = 'https://localhost:7122/api/ProductTypes';
  public getProductType(): Observable<any> {
    return this.httpClient.get<ProductType>(this.productTypeUrl);
  }

  public getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(this.dataUrlOnline);
  }
  public getProductById(id:any): Observable<any> {
    return this.httpClient.get<any>(`${this.dataUrlOnline}/${id}`);
  }
  public postProduct(product:Product): Observable<any> {
    return this.httpClient.post<any>(this.dataUrlOnline,product);
  }
  public putProduct(product:Product): Observable<any> {
    return this.httpClient.put<any>(`${this.dataUrlOnline}/${product.id}`,product);
  }

  dataUrlOnline: string = 'https://localhost:7122/api/Products';
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

  urlImage ='https://localhost:7122/api/Images';
  public postImg(image:Image): Observable<any> {
    return this.httpClient.post<any>(this.urlImage, image);
  }

  // Get Review sản phẩm
  urlReview="https://localhost:7122/api/Reviews";
  getReviewOfProduct(productId:number) {
    return this.httpClient.get<any>(`${this.urlReview}/GetReviewOfProduct?productId=${productId}`);
  }
  // Tên username review sản phẩm đó
  urlUserReview="https://localhost:7122/api/Users";
  getUserReviewProduct(userId:number) {
    return this.httpClient.get<any>(`${this.urlUserReview}/${userId}`);
  }

  // Lấy danh sách sản phẩm gợi ý
  urlRecommendation = 'https://localhost:7122/api/ProductRecommendations';
  getListRecommendation(userId:number) {
    return this.httpClient.get<any>(`${this.urlRecommendation}?userId=${userId}&topK=5`);
  }
}
