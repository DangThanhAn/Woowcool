import { ShareComponentModule } from './../../../modules/share-component/share-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AoThunRoutingModule } from './ao-thun-routing.module';
import { AoThunComponent } from './ao-thun.component';


@NgModule({
  declarations: [
    AoThunComponent
  ],
  imports: [
    CommonModule,
    AoThunRoutingModule,
    ShareComponentModule
  ]
})
export class AoThunModule { }
