import { ShareComponentModule } from './../../../modules/share-component/share-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AoSoMiRoutingModule } from './ao-so-mi-routing.module';
import { AoSoMiComponent } from './ao-so-mi.component';


@NgModule({
  declarations: [
    AoSoMiComponent
  ],
  imports: [
    CommonModule,
    AoSoMiRoutingModule,
    ShareComponentModule
  ]
})
export class AoSoMiModule { }
