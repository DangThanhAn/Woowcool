import { ReviewsComponent } from './reviews/reviews.component';
import { OrdersComponent } from './orders/orders.component';
import { InfoComponent } from './info/info.component';
import { AccountComponent } from './account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/features/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      {path:'info',component: InfoComponent},
      {path:'orders',component: OrdersComponent},
      {path:'reviews',component: ReviewsComponent},
    ],
    canActivate: [AuthGuardService]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
