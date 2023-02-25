import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }
  checkoutForm = this.formBuilder.group({
    // name : this.formBuilder.control(''),
    // name: ['',[Validators.required,Validators.minLength(3)]],
    name:'',
    phonenumber:'',
    email: '',
    password: '',
    repassword: '',

    // address : this.formBuilder.control(''),
  });

  onSubmit():void{
    console.log(this.checkoutForm.value);
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
