import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-ao-tank-top',
  templateUrl: './ao-tank-top.component.html',
  styleUrls: ['./ao-tank-top.component.css']
})
export class AoTankTopComponent implements OnInit{
  ngOnInit(): void {
    this.getProduct();
  }
  constructor(private ProductService : ProductService){}
  products: Product[] = [];
  getProduct(){
    this.ProductService.getAllProductsv1().pipe(
      map(response => response.filter((product: { categoryId: number; }) => product.categoryId == 1))
    ).subscribe(data =>{
      this.products = data;
    })
  }

}
