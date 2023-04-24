import { ShareComponentModule } from 'src/app/modules/share-component/share-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AoNamRoutingModule } from './ao-nam-routing.module';
import { AoNamComponent } from './ao-nam.component';
import {DropdownModule} from 'primeng/dropdown';


// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AoNamComponent
  ],
  imports: [
    CommonModule,
    AoNamRoutingModule,
    ShareComponentModule,DropdownModule,FormsModule
  ]
})
export class AoNamModule { }
