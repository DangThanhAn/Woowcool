import { RisingComponent } from './pages/rising/rising.component';
import { AboutCoolmateComponent } from './pages/about-coolmate/about-coolmate.component';
import { CoolxprintComponent } from './pages/coolxprint/coolxprint.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './pages/all-product/all-product.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AdminGuardService } from './features/auth/admin-guard.service';
import { AuthGuardService } from './features/auth/auth-guard.service';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  // {path : '',component: DashboardComponent},
  // {path: 'all-product',component: AllProductComponent},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '', component: DashboardComponent },
      {path: 'all-product',component: AllProductComponent},
      {path: 'product-details/:id', component: ProductDetailsComponent },
      {path: 'cart',component: CartComponent,canActivate: [AuthGuardService]},
      {path: 'blog',component: BlogComponent},
      {path: 'coolxprint',component: CoolxprintComponent},
      {path: 'aboutcoolmate',component: AboutCoolmateComponent},
      {path: 'rising',component: RisingComponent},
      {path: 'checkout',component: CheckoutComponent,canActivate: [AuthGuardService]},
      {path: 'filter-product',loadChildren: () => import('./pages/FilterProduct/filter-product.module').then(m => m.FilterProductModule)},
      {path: 'account',loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)},
      {path: 'permission',loadChildren: () => import('./pages/permission/permission.module').then(m => m.PermissionModule)},
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/routes/admin/admin.module').then(m => m.AdminModule),canActivate: [AdminGuardService]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
