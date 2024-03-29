import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  constructor(private http: HttpClient) {}

  urlUser = 'https://localhost:7122/api/Users';
  public getListUser(): Observable<any> {
    return this.http.get<any>(this.urlUser);
  }
  public putUser(user:any): Observable<any> {
    return this.http.put<any>(this.urlUser+"/"+user.id,user);
  }
  public UpgradePermission(userId:any): Observable<any> {
    return this.http.get<any>(this.urlUser+"/UpgradePermission?userId="+userId);
  }

  urlOrder = 'https://localhost:7122/api/Orders';
  public getDataViewMO(): Observable<any> {
    return this.http.get<any>(this.urlOrder);
  }
  // cập nhật trạng thái đơn hàng
  public updateStatusOrder(orderId:number,status:string): Observable<any> {
    return this.http.get<any>(this.urlOrder+"/UpdateStatusOrder?orderId="+orderId+"&status="+status.toString());
  }
  // Lấy thông tin chart pie phần statics
  public GetChartPie(): Observable<any> {
    return this.http.get<any>(this.urlOrder+"/GetChartPie");
  }
}

