import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanJeanRoutingModule } from './quan-jean-routing.module';
import { QuanJeanComponent } from './quan-jean.component';
import { ShareComponentModule } from 'src/app/modules/share-component/share-component.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuanJeanComponent
  ],
  imports: [
    CommonModule,
    QuanJeanRoutingModule,ShareComponentModule,DropdownModule,FormsModule
  ]
})
export class QuanJeanModule { }
