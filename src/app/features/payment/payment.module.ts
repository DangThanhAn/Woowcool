import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoMoComponent } from './mo-mo/mo-mo.component';
import { ZaloPayComponent } from './zalo-pay/zalo-pay.component';
import { ShoppePayComponent } from './shoppe-pay/shoppe-pay.component';
import { VNPayComponent } from './vnpay/vnpay.component';



@NgModule({
  declarations: [
    MoMoComponent,
    ZaloPayComponent,
    ShoppePayComponent,
    VNPayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
