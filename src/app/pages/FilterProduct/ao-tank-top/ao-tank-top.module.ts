import { ShareComponentModule } from '../../../modules/share-component/share-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AoTankTopRoutingModule } from './ao-tank-top-routing.module';
import { AoTankTopComponent } from './ao-tank-top.component';


@NgModule({
  declarations: [
    AoTankTopComponent
  ],
  imports: [
    CommonModule,
    AoTankTopRoutingModule,
    ShareComponentModule
  ]
})
export class AoTankTopModule { }
