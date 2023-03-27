import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { InfoComponent } from './info/info.component';
import { OrdersComponent } from './orders/orders.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AccountComponent } from './account.component';
import { InfoOrderComponent } from './info-order/info-order.component';


@NgModule({
  declarations: [
    InfoComponent,
    OrdersComponent,
    ReviewsComponent,
    AccountComponent,
    InfoOrderComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
