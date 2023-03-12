import { ShareComponentModule } from 'src/app/modules/share-component/share-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AoNamRoutingModule } from './ao-nam-routing.module';
import { AoNamComponent } from './ao-nam.component';


@NgModule({
  declarations: [
    AoNamComponent
  ],
  imports: [
    CommonModule,
    AoNamRoutingModule,
    ShareComponentModule
  ]
})
export class AoNamModule { }
