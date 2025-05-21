import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  constructor(private http: HttpClient) {}

  urlAdminDashboard = 'https://localhost:7122/api/AdminDashbroad';

  public GetOrder(): Observable<any> {
    return this.http.get<any>(`${this.urlAdminDashboard}/GetOrder`);
  }
  public GetOrderInDay(): Observable<any> {
    return this.http.get<any>(`${this.urlAdminDashboard}/GetOrderInDay`);
  }
  public GetRevenue(): Observable<any> {
    return this.http.get<any>(`${this.urlAdminDashboard}/GetRevenue`);
  }
  public GetRevenueToday(): Observable<any> {
    return this.http.get<any>(`${this.urlAdminDashboard}/GetRevenueToday`);
  }
  public GetRevenueInMonth(month:number): Observable<any> {
    return this.http.get<any>(`${this.urlAdminDashboard}/GetRevenueInMonth?month=${month}`);
  }
  public GetOrderInMonth(month:number): Observable<any> {
    return this.http.get<any>(`${this.urlAdminDashboard}/GetOrderInMonth?month=${month}`);
  }
  public GetCustomer(): Observable<any> {
    return this.http.get<any>(`${this.urlAdminDashboard}/GetCustomer`);
  }
  public GetReview(): Observable<any> {
    return this.http.get<any>(`${this.urlAdminDashboard}/GetReview`);
  }
}
