import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './pages/all-product/all-product.component';
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
      {path: 'product-details/:productID', component: ProductDetailsComponent },
      {path: 'cart',component: CartComponent},


    ]
  },
  {path: 'admin',
    loadChildren: () => import('src/app/routes/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
