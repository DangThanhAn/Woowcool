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
    
    '../../../assets/imgdashboard/Capture2.JPG',
    '../../../assets/imgdashboard/Capture1.JPG',
    '../../../assets/imgdashboard/Capture3.jpg'
  ];
  products: Product[] = [];
  getProduct(){
    this.productService.getAllProductsv1().subscribe((data)=>{
      this.products = data;
    })
  }
}
