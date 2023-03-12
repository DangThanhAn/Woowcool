import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ao-nam', loadChildren: () => import('./ao-nam/ao-nam.module').then(m => m.AoNamModule) },
  { path: 'ao-polo', loadChildren: () => import('./ao-polo/ao-polo.module').then(m => m.AoPoloModule) },
  { path: 'ao-so-mi', loadChildren: () => import('./ao-so-mi/ao-so-mi.module').then(m => m.AoSoMiModule) },
  { path: 'ao-thun', loadChildren: () => import('./ao-thun/ao-thun.module').then(m => m.AoThunModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterProductRoutingModule { }
