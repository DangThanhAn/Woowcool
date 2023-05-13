
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MoMoComponent } from './mo-mo/mo-mo.component';
import { PaymentComponent } from './payment.component';
import { VNPayComponent } from './vnpay/vnpay.component';
import { ZaloPayComponent } from './zalo-pay/zalo-pay.component';
import { ShoppePayComponent } from './shoppe-pay/shoppe-pay.component';


const routes: Routes = [
  {path: '', component: PaymentComponent,
  children:[
    { path: '', redirectTo: 'momo', pathMatch: 'full' },
    {path:'momo',component: MoMoComponent},
    {path:'vnpay',component: VNPayComponent},
    {path:'zalopay',component: ZaloPayComponent},
    {path:'shopeepay',component: ShoppePayComponent},
  ]
}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }

