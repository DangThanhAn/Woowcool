import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhuKienRoutingModule } from './phu-kien-routing.module';
import { PhuKienComponent } from './phu-kien.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ShareComponentModule } from 'src/app/modules/share-component/share-component.module';


@NgModule({
  declarations: [
    PhuKienComponent
  ],
  imports: [
    CommonModule,
    PhuKienRoutingModule
    ,ShareComponentModule,DropdownModule,FormsModule
  ]
})
export class PhuKienModule { }
