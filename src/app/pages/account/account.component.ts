import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  pages = [
    {routeLink:'/account/info',
    label:'Thông tin cá nhân',},
    {routeLink:'/account/orders',
    label:'Danh sách đơn hàng',},
    {routeLink:'/account/reviews',
    label:'Đánh giá',},
    {routeLink:'logout',
    label:'Thoát',}
  ];
}
