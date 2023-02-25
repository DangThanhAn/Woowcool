import { AdSettingsComponent } from './ad-pages/ad-settings/ad-settings.component';
import { AdCollectionsComponent } from './ad-pages/ad-collections/ad-collections.component';
import { AdBlogComponent } from './ad-pages/ad-blog/ad-blog.component';
import { AdCoupensComponent } from './ad-pages/ad-coupens/ad-coupens.component';
import { AdStatisticsComponent } from './ad-pages/ad-statistics/ad-statistics.component';
import { AdProductsComponent } from './ad-pages/ad-products/ad-products.component';
import { AdminLayoutComponent } from './ad-layouts/admin-layout/admin-layout.component';
import { AdUserProfileComponent } from './ad-pages/ad-user-profile/ad-user-profile.component';
import { AdDashboardComponent } from './ad-pages/ad-dashboard/ad-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  // { path: '',component: AdminLayoutComponent, },
  // // { path: '',component: AdDashboardComponent },

  // { path: 'admin/dashboard',component: AdDashboardComponent },
  // { path: 'admin/user-profile',component: AdUserProfileComponent, outlet: 'admin' },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdDashboardComponent },
      { path: 'products', component: AdProductsComponent },
      { path: 'statistics', component: AdStatisticsComponent },
      { path: 'coupens', component: AdCoupensComponent },
      { path: 'blog', component: AdBlogComponent },
      { path: 'collections', component: AdCollectionsComponent },
      { path: 'settings', component: AdSettingsComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

