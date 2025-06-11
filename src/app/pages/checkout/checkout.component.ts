import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  constructor(private UserService:UserService){

  }
  ngOnInit(): void {
    this.getUser();
    this.getDataCheckout();
  }
  currentUser: any;
  getUser() {
    let token = localStorage.getItem('access_token');
    if (!(token == null || token == '')) {
      this.currentUser = this.UserService.getUserFromToken(token);
    }
  }
  mydata:any[] = [];
  getDataCheckout(){
    this.UserService.getDataCheckout(this.currentUser ? this.currentUser.id : 0).subscribe((data:any)=>{
      this.mydata = data;
    })
  }

}
