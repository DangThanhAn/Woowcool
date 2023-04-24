import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AoPoloRoutingModule } from './ao-polo-routing.module';
import { AoPoloComponent } from './ao-polo.component';
import { ShareComponentModule } from 'src/app/modules/share-component/share-component.module';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    AoPoloComponent
  ],
  imports: [
    CommonModule,
    AoPoloRoutingModule,
    ShareComponentModule,
    DropdownModule
  ]
})
export class AoPoloModule { }
