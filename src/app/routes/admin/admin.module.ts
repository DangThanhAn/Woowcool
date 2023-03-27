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




import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';

import {OverlayModule} from '@angular/cdk/overlay'
import {CdkMenuModule} from '@angular/cdk/menu'
// import Chart from 'chart.js';

@NgModule({
  declarations: [BodyComponent,SidenavComponent,AdUserProfileComponent,AdDashboardComponent,AdminLayoutComponent, AdProductsComponent, AdStatisticsComponent, AdCoupensComponent, AdBlogComponent, AdCollectionsComponent, AdSettingsComponent, AdHeaderComponent],
  imports: [
    CommonModule,AdminRoutingModule,RouterModule,
    CdkMenuModule,
    OverlayModule,ReactiveFormsModule,FormsModule,ProgressSpinnerModule,

    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ChartModule,
    MenuModule
  ]
})
export class AdminModule { }
