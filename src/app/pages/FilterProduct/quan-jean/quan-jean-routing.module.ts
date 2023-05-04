import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanJeanComponent } from './quan-jean.component';

const routes: Routes = [
  { path: '', component: QuanJeanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanJeanRoutingModule { }
