import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoMoComponent } from './mo-mo/mo-mo.component';
import { ZaloPayComponent } from './zalo-pay/zalo-pay.component';
import { ShoppePayComponent } from './shoppe-pay/shoppe-pay.component';
import { VNPayComponent } from './vnpay/vnpay.component';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    MoMoComponent,
    ZaloPayComponent,
    ShoppePayComponent,
    VNPayComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,RouterModule,PaymentRoutingModule,SharedPipeModule,ProgressSpinnerModule
  ]
})
export class PaymentModule { }
