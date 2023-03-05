import { ButtonModule } from './../../components/button/button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ShareComponentModule } from 'src/app/modules/share-component/share-component.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NewPasswordComponent,

  ],
  imports: [
    CommonModule,ButtonModule,FormsModule,BrowserModule,ReactiveFormsModule
    ,ShareComponentModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    NewPasswordComponent,
  ],
})
export class AuthModule { }
