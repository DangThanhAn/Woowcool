import { CartService } from './../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Emitters } from './../../emitters/emitters';
import { AuthService } from './../../features/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private authService:AuthService,
    private userService: UserService,
    private CartService: CartService
    ) { }

  ngOnInit(): void {
    // this.logout();
    this.isAuthenticated = this.authService.isLoggedIn();
    // this.userService.getCart(1).subscribe((data)=> console.log(data))
    this.getUser();
    this.getNumberSpInCart();
  }
  currentUser: any;
  numberIncart:number=0;
  getUser() {
    let token = localStorage.getItem('access_token');
    if (!(token == null || token == '')) {
      this.currentUser = this.userService.getUserFromToken(token);
    }

  }
  getNumberSpInCart(){
    this.CartService.GetNumberInCart(this.currentUser.Id).subscribe((res)=>{
      this.numberIncart = res;
    })
  }
  status ='';
  isLogin = false;
  isNewPassword = false;
  isRegister = false;

  isAuthenticated: boolean = false;
  logout():void{
    this.authService.logout().subscribe(()=>
    Emitters.authEmitter.emit(false)
    );
  }

  /**
   * Author: DT An
   * 28/12/22
   * Khi click vào icon người dùng thì show popup
   */
  clickedUser(){
    this.isLogin = true;
  }

  // Click hiện menu (phần responsive moblie)
  isShow:boolean=true;
  isHide:boolean=false;
  clickMenuFunc(){
    this.isShow = false;
    this.isHide = true;
  }
  closeMenu(){
    this.isShow = true;
    this.isHide = false;
  }
  //end


  /**
   * Author: AnDT10
   * 06/02/23
   * Khi click vào icon search thì show thanh tìm kiếm
   */
  isShowInputSearch:boolean=false;
  clickedSearch(){
    this.isShowInputSearch = !this.isShowInputSearch;
  }
  offClick(){
    this.isShowInputSearch = !this.isShowInputSearch;
  }
}
