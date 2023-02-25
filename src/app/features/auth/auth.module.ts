import { ButtonModule } from './../../components/button/button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NewPasswordComponent,

  ],
  imports: [
    CommonModule,ButtonModule,FormsModule,BrowserModule,ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    NewPasswordComponent,

  ],
})
export class AuthModule { }
