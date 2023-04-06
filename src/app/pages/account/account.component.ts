import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
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
  constructor(private userService: UserService){}

  ngOnInit(){
    this.getUser();
  }
  currentUser:any;
  getUser(){
    let token = localStorage.getItem('access_token');
    if(!(token == null || token == "")){
      this.currentUser = this.userService.getUserFromToken(token);
    }
  }
}
