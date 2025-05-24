import { HttpClient } from '@angular/common/http';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit{
  constructor(private httpClient:HttpClient,
    private productService:ProductService,
  private router: Router){

  }
  ngOnInit(): void {
    this.getProduct();
  }
  imgCollections:string[] = [
    
    '../../../assets/imgdashboard/Capture2.JPG',
    '../../../assets/imgdashboard/Capture1.JPG',
    '../../../assets/imgdashboard/Capture3.jpg'
  ];

  goToFilterProduct(index : number) {
      this.router.navigate([this.imgCollectionRouter[index]]);
  }
  
  imgCollectionRouter:string [] = [
    '/filter-product/ao-nam',
    '/filter-product/quan-nam',
    '/filter-product/phu-kien'
  ]
  products: Product[] = [];
  getProduct(){
    this.productService.getAllProductsv1().subscribe((data)=>{
      this.products = data;
    })
  }
}
