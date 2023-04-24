import { Component, OnInit, Output, EventEmitter,HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeOut', [
      transition(':leave', [
        animate('500ms ease', keyframes([
          style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
          style({ transform: 'scale(0.5)', opacity: 0.5, offset: 0.5 }),
          style({ transform: 'scale(0)', opacity: 0, offset: 1 }),
        ]))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
    private authService : AuthService,
    private router: Router
    ) { }

  listUser: any;
  @HostBinding('@fadeOut') get fadeOut() {
    return { value: this.isShow };
  }
  ngOnInit(): void {
  }
  checkoutForm = this.formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });
  get email():string | any{
    return this.checkoutForm.get('email');
  }
  get password():string | any{
    return this.checkoutForm.get('password');
  }

  /**
   * Khi click submit thì
   * 1. check xem đã nhập đủ thông tin chưa
   * 2. correct -> Kiểm tra xem thông tin vừa nhập có trùng với database hay không?
   * 3. correct -> router về trang chủ
   */
  accountFalse: boolean = false; // biến thông báo tài khoản hoặc mật khẩu không đúng
  checkEmpty?:boolean = this.email?.pristine;
  // onSubmit():void{
  //   if (this.email?.invalid == false && this.password?.invalid == false){
  //     let userCurrent = this.checkoutForm.value;
  //     let arrSearch = this.listUser.find((temp: { email: string | null | undefined; }) => temp.email == userCurrent.email);
  //     if(arrSearch == undefined){
  //       this.accountFalse = true;
  //     }else{
  //       if(userCurrent.password == arrSearch.password){
  //         this.router.navigate(['/', 'dashbroad','login']).then(nav => {
  //           console.log("Router đến trang chủ thành công",nav);
  //           this.closePopup();
  //         });
  //         this.checkoutForm.reset();
  //       }
  //       else{
  //         this.accountFalse = true;
  //       }
  //     }
  //   }else{
  //     console.log("Thông tin vừa nhập còn thiếu");
  //     console.log(this.checkEmpty);
  //   }
  // }

  onSubmit():void{
    this.authService.login(this.checkoutForm.getRawValue()).subscribe(
      result => {
        if(result){
          this.isShow = false;
          const user = this.authService.getCurrentUser();
          if(user.role === "admin"){
            this.router.navigate(['/admin/dashboard'])
          }else{
            location.reload();
          }
        }
      }
    )
  }


  // Xử lí đóng mở popup

  @Output() returnDefaultVal = new EventEmitter();
  @Output() showRegister = new EventEmitter();
  @Output() showForgotPassword = new EventEmitter();

  isShow:boolean=true;
  closePopup(){
    this.isShow=false;
    this.returnDefaultVal.emit();
  }
  // Khi lick vào đăng kí thì tắt popup đăng nhập đi, hiện popup đăng kí lên
  clickedRegister(){
    this.isShow=false;
    this.showRegister.emit();
  }
  // Khi click vào quên mật khẩu thì
  // 1. Tắt form login đi
  // 2. Hiện form quên mật khẩu lên
  clickedForgotPassword(){
    this.isShow = false;
    this.showForgotPassword.emit();
  }
}
