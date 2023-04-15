import { ShareComponentModule } from './../../modules/share-component/share-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { InfoComponent } from './info/info.component';
import { OrdersComponent } from './orders/orders.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AccountComponent } from './account.component';
import { InfoOrderComponent } from './info-order/info-order.component';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { RatingModule } from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';

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
    AccountRoutingModule,FormsModule,ReactiveFormsModule,SliderModule,InputTextModule,DropdownModule,SharedPipeModule,RatingModule,FileUploadModule,ShareComponentModule
  ]
})
export class AccountModule { }
