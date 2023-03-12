import { ProductComponent } from 'src/app/components/product/product.component';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';




@NgModule({
  declarations: [
    ToastMessageComponent,ProductComponent
  ],
  imports: [
    CommonModule,RouterModule,SharedPipeModule
  ],
  exports:[
    ToastMessageComponent,ProductComponent
  ]
})
export class ShareComponentModule { }
