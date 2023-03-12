import { HttpClient } from '@angular/common/http';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{
  constructor(private httpClient:HttpClient,
    private productService:ProductService){

  }
  ngOnInit(): void {
    this.getProduct();
  }
  imgCollections:string[] = [
    'https://mcdn.coolmate.me/image/October2022/mceclip2_22.png',
    'https://mcdn.coolmate.me/image/December2022/mceclip0_60.png',
    'https://mcdn.coolmate.me/image/December2022/mceclip1_76.png',
    'https://mcdn.coolmate.me/image/December2022/mceclip4_36.png',
    'https://mcdn.coolmate.me/image/December2022/mceclip2_45.png'
  ];
  products: Product[] = [];
  getProduct(){
    this.productService.getAllProductsv1().subscribe((data)=>{
      this.products = data;
    })
  }
}
