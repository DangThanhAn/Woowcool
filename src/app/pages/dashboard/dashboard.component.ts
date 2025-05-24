import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tabIndex: number = 1;
  productsWakanda: Product[] = [];
  productsWinter: Product[]  = [];
  productsAccessory: Product[]  = [];
  constructor(private productService:ProductService) {
   }
   images = [
    {
      imageSrc:
        '../../../assets/imgdashboard/banner1.jpg',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
      '../../../assets/imgdashboard/banner2.jpg',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        '../../../assets/imgdashboard/banner3.jpg',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        '../../../assets/imgdashboard/banner4.jpg',
      imageAlt: 'person2',
    },
  ]
  isActive:Boolean = true;
  isActive2:Boolean = false;
  isActive3:Boolean = false;
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data)=>{
      data.forEach((element: Product) => {
        if(element.collectionId == 2){
          this.productsWinter?.push(element);
        }
        if(element.collectionId == 3){
          this.productsAccessory?.push(element);
        }
      });
      this.productsWinter = this.productsWinter.slice(0,4);
      console.log(this.productsAccessory);
      
      this.productsAccessory = this.productsAccessory.slice(0,4);
    });
    this.GetListFeaturedProducts();
  }
  changeTab(tabIndex:number){
    if(tabIndex == 2){
      this.isActive2 = true;
      this.isActive= false;
      this.isActive3 = false;
    }else if(tabIndex == 3){
      this.isActive2 = false;
      this.isActive= false;
      this.isActive3 = true;
    }else{
      this.isActive2 = false;
      this.isActive= true;
      this.isActive3 = false;
    }
    this.tabIndex = tabIndex;
  }
  GetListFeaturedProducts(){
    this.productService.GetListFeaturedProducts(4).subscribe((data)=>{
      this.productsWakanda = data;
    })
  }

}
