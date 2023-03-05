import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { AuthService } from './../auth.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,

    ) { }

  ngOnInit(): void {
  }
  @ViewChild(ToastMessageComponent) toastMessageComponent: ToastMessageComponent | undefined;
  isShowToast = false;

  checkoutForm = this.formBuilder.group({
    // name : this.formBuilder.control(''),
    // name: ['',[Validators.required,Validators.minLength(3)]],
    name:'',
    phonenumber:'',
    email: '',
    password: '',
    repassword: '',
    role: 'user',

    // address : this.formBuilder.control(''),
  });

  onSubmit():void{
    this.authService.register(this.checkoutForm.value).subscribe(()=>{
      this.isShow=false;
      this.toastMessageComponent?.changeH4Content("Đăng kí thành công",'success',false);
      this.isShowToast = true;
      setTimeout(() => {
        this.isShowToast = false;
      }, 2000);

    });

    this.checkoutForm.reset();
  }
  @Output() returnDefaultVal = new EventEmitter();
  isShow:boolean=true;
  closePopup(){
    this.isShow=false;
    this.returnDefaultVal.emit();
  }
  // Khi click vào chữ đăng nhập trên form đăng kí thì 1. tắt form đăng kí, 2. hiện form đăng nhập
  @Output() showFormLogin = new EventEmitter();
  clickedLogin(){
    this.isShow=false;
    this.showFormLogin.emit();
  }
  // Khi click vào quên mật khẩu thì
  // 1. Tắt form login đi
  // 2. Hiện form quên mật khẩu lên
  @Output() showForgotPassword = new EventEmitter();
  clickedForgotPassword(){
    this.isShow = false;
    this.showForgotPassword.emit();
  }
}
