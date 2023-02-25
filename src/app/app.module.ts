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
import { ProductComponent } from './components/product/product.component';
import { CommonModule } from '@angular/common';
import { AllProductComponent } from './pages/all-product/all-product.component';
import { LayoutComponent } from './layout/layout.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { FormatVndPipe } from './pipes/format-vnd.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    InputSearchComponent,
    FooterComponent,
    ProductComponent,
    AllProductComponent,
    LayoutComponent,
    CartComponent,
    ProductDetailsComponent,
    ToastMessageComponent,
    FormatVndPipe
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
