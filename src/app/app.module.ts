import { AccountModule } from './pages/account/account.module';
import { AuthModule } from './features/auth/auth.module';
import { ButtonModule } from './components/button/button.module';
import { CarouselModule } from './components/carousel/carousel.module';
import { AdminModule } from './routes/admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AllProductComponent } from './pages/all-product/all-product.component';
import { LayoutComponent } from './layout/layout.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { TextfieldComponent } from './components/textfield/textfield.component';
import { ShareComponentModule } from './modules/share-component/share-component.module';
import { BlogComponent } from './pages/blog/blog.component';
import { CoolxprintComponent } from './pages/coolxprint/coolxprint.component';
import { AboutCoolmateComponent } from './pages/about-coolmate/about-coolmate.component';
import { RisingComponent } from './pages/rising/rising.component';
import { SharedPipeModule } from './pipes/shared-pipe.module';
import { PermissionModule } from './pages/permission/permission.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {ScrollTopModule} from 'primeng/scrolltop';
import { DropdownModule } from 'primeng/dropdown';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    InputSearchComponent,
    FooterComponent,
    AllProductComponent,
    LayoutComponent,
    CartComponent,
    ProductDetailsComponent,
    TextfieldComponent,
    BlogComponent,
    CoolxprintComponent,
    AboutCoolmateComponent,
    RisingComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    CarouselModule,
    Ng2SearchPipeModule,
    FormsModule,HttpClientModule,BrowserAnimationsModule,ReactiveFormsModule,
    ButtonModule,
    AuthModule,
    AccountModule,
    ShareComponentModule,
    SharedPipeModule,
    PermissionModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    DropdownModule,
    NgxQRCodeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
