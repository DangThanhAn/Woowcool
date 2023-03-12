import { Product } from './../../../models/product';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-ao-so-mi',
  templateUrl: './ao-so-mi.component.html',
  styleUrls: ['./ao-so-mi.component.css']
})
export class AoSoMiComponent implements OnInit{
  ngOnInit(): void {
    this.getProduct();
  }
  constructor(private ProductService : ProductService){}
  products: Product[] = [];
  getProduct(){
    this.ProductService.getAllProductsv1().pipe(
      map(response => response.filter((product: { categoryId: number; }) => product.categoryId == 2))
    ).subscribe(data =>{
      this.products = data;
    })
  }

}
