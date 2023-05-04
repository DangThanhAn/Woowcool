import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ao-nam', loadChildren: () => import('./ao-nam/ao-nam.module').then(m => m.AoNamModule) },
  { path: 'ao-polo', loadChildren: () => import('./ao-polo/ao-polo.module').then(m => m.AoPoloModule) },
  { path: 'ao-so-mi', loadChildren: () => import('./ao-so-mi/ao-so-mi.module').then(m => m.AoSoMiModule) },
  { path: 'ao-thun', loadChildren: () => import('./ao-thun/ao-thun.module').then(m => m.AoThunModule) },
  { path: 'quan-jean', loadChildren: () => import('./quan-jean/quan-jean.module').then(m => m.QuanJeanModule) },
  { path: 'quan-kaki', loadChildren: () => import('./quan-kaki/quan-kaki.module').then(m => m.QuanKakiModule) },
  { path: 'quan-nam', loadChildren: () => import('./quan-nam/quan-nam.module').then(m => m.QuanNamModule) },
  { path: 'phu-kien', loadChildren: () => import('./phu-kien/phu-kien.module').then(m => m.PhuKienModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterProductRoutingModule { }
