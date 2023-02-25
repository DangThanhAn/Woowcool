import { RouterModule } from '@angular/router';
import { BodyComponent } from './ad-components/body/body.component';
import { SidenavComponent } from './ad-components/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module'
import { AdDashboardComponent } from './ad-pages/ad-dashboard/ad-dashboard.component';
import { AdUserProfileComponent } from './ad-pages/ad-user-profile/ad-user-profile.component';
import { AdminLayoutComponent } from './ad-layouts/admin-layout/admin-layout.component';
import { AdProductsComponent } from './ad-pages/ad-products/ad-products.component';
import { AdStatisticsComponent } from './ad-pages/ad-statistics/ad-statistics.component';
import { AdCoupensComponent } from './ad-pages/ad-coupens/ad-coupens.component';
import { AdBlogComponent } from './ad-pages/ad-blog/ad-blog.component';
import { AdCollectionsComponent } from './ad-pages/ad-collections/ad-collections.component';
import { AdSettingsComponent } from './ad-pages/ad-settings/ad-settings.component';
import { AdHeaderComponent } from './ad-components/ad-header/ad-header.component';

import {OverlayModule} from '@angular/cdk/overlay'
import {CdkMenuModule} from '@angular/cdk/menu'

@NgModule({
  declarations: [BodyComponent,SidenavComponent,AdUserProfileComponent,AdDashboardComponent,AdminLayoutComponent, AdProductsComponent, AdStatisticsComponent, AdCoupensComponent, AdBlogComponent, AdCollectionsComponent, AdSettingsComponent, AdHeaderComponent],
  imports: [
    CommonModule,AdminRoutingModule,RouterModule,
    CdkMenuModule,
    OverlayModule
  ]
})
export class AdminModule { }
