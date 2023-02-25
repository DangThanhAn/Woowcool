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
        'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/February2023/Banner_valentine.jpg',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
      'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/February2023/2Banner-Ant-Man-Collection_1.jpg',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
        'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/November2022/Banner-Coolmate-Active-opt-1s.jpg',
      imageAlt: 'person1',
    },
    {
      imageSrc:
        'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/November2022/black-panther-hero-banner-des.jpg',
      imageAlt: 'person2',
    },
  ]
  isActive:Boolean = true;
  isActive2:Boolean = false;
  isActive3:Boolean = false;
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data)=>{
      console.log("Sản phẩm lấy từ service: ");
      console.log(data);
      data.forEach((element: Product) => {
        if(element.cataloryID == "1"){
          this.productsWakanda.push(element);
        }
        if(element.cataloryID == "2"){
          this.productsWinter?.push(element);
        }
      });
    })
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

}
