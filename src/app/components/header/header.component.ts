import { CartService } from './../../services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Emitters } from './../../emitters/emitters';
import { AuthService } from './../../features/auth/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';

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
    if(this.currentUser){
      this.CartService.GetNumberInCart(this.currentUser.id).subscribe((res)=>{
        this.numberIncart = res;
        console.log(this.numberIncart);
      })
    }else{
    const guest_cart = localStorage.getItem('guest_cart');
   if (guest_cart) {
      const cartObj = JSON.parse(guest_cart);
      const cartItems = cartObj.cartDetails || [];
      this.numberIncart = cartItems.reduce((total: number, item: any) => total + (item.quantity || 0), 0);
    } else {
      this.numberIncart = 0;
    }
    }

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
    this.isShowInputSearch = true;
  }
  offClick(){
    this.isShowInputSearch = false;
  }

  onContainerClick() {
    this.isShowInputSearch = true;
    // Do nothing
  }

}
