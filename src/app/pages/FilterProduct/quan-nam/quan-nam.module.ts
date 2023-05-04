import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanNamRoutingModule } from './quan-nam-routing.module';
import { QuanNamComponent } from './quan-nam.component';
import { ShareComponentModule } from 'src/app/modules/share-component/share-component.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuanNamComponent
  ],
  imports: [
    CommonModule,
    QuanNamRoutingModule,
    ShareComponentModule,DropdownModule,FormsModule

  ]
})
export class QuanNamModule { }
