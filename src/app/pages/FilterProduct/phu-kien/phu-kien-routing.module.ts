import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhuKienComponent } from './phu-kien.component';

const routes: Routes = [
  { path: '', component: PhuKienComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhuKienRoutingModule { }
