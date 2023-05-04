import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanNamComponent } from './quan-nam.component';

const routes: Routes = [
  { path: '', component: QuanNamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanNamRoutingModule { }
