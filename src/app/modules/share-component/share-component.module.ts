import { ProductComponent } from 'src/app/components/product/product.component';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { SharedPipeModule } from 'src/app/pipes/shared-pipe.module';
import { DropdownSortComponent } from 'src/app/components/dropdown-sort/dropdown-sort.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ToastMessageComponent,ProductComponent,DropdownSortComponent
  ],
  imports: [
    CommonModule,RouterModule,SharedPipeModule,DropdownModule,FormsModule
  ],
  exports:[
    ToastMessageComponent,ProductComponent,DropdownSortComponent
  ]
})
export class ShareComponentModule { }
