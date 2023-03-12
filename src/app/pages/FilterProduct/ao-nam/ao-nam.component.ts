import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-ao-nam',
  templateUrl: './ao-nam.component.html',
  styleUrls: ['./ao-nam.component.css']
})
export class AoNamComponent implements OnInit{
  ngOnInit(): void {
    this.getProduct();
  }
  constructor(private ProductService : ProductService){}
  products: Product[] = [];
  getProduct(){
    this.ProductService.getAllProductsv1().pipe(
      map(response => response.filter((product: { collectionId: number; }) => product.collectionId == 1))
    ).subscribe(data =>{
      this.products = data;
    })
  }
}
