import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private httpClient: HttpClient) {}

  urlCollection = 'https://localhost:7122/api/Collections';
  urlProductType = 'https://localhost:7122/api/ProductTypes';
  urlCategory = 'https://localhost:7122/api/Categories';
  public getProductType(): Observable<any> {
    return this.httpClient.get<any>(this.urlProductType);
  }
  public getCollection(): Observable<any> {
    return this.httpClient.get<any>(this.urlCollection);
  }
  public getCategory(): Observable<any> {
    return this.httpClient.get<any>(this.urlCategory);
  }
}
