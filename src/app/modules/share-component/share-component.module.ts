import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';


@NgModule({
  declarations: [
    ToastMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ToastMessageComponent
  ]
})
export class ShareComponentModule { }
