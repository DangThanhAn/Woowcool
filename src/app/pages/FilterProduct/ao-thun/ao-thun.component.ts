import { map } from 'rxjs/operators';
import { Product } from './../../../models/product';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ao-thun',
  templateUrl: './ao-thun.component.html',
  styleUrls: ['./ao-thun.component.css']
})
export class AoThunComponent  implements OnInit{
  ngOnInit(): void {
    this.getProduct();
  }
  constructor(private ProductService : ProductService){}

  products: Product[] = [];
  aoThunCottonCompact: Product[] = [];
  aoThunCottonCoolmate: Product[] = [];
  getProduct(){
    this.ProductService.getAllProductsv1().pipe(
      map(response => response.filter((product: { categoryId: number; }) => product.categoryId == 3))
    ).subscribe(data =>{
      this.products = data;
      this.products.forEach(element => {
        if(element.productTypeId == 5){
          this.aoThunCottonCompact.push(element)
        }
        if(element.productTypeId == 6){
          this.aoThunCottonCoolmate.push(element)
        }
      });
    })
  }
}
