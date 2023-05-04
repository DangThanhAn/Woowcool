import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanKakiRoutingModule } from './quan-kaki-routing.module';
import { QuanKakiComponent } from './quan-kaki.component';
import { ShareComponentModule } from 'src/app/modules/share-component/share-component.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuanKakiComponent
  ],
  imports: [
    CommonModule,
    QuanKakiRoutingModule,
    ShareComponentModule,DropdownModule,FormsModule

  ]
})
export class QuanKakiModule { }
