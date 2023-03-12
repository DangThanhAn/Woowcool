import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-ao-polo',
  templateUrl: './ao-polo.component.html',
  styleUrls: ['./ao-polo.component.css']
})
export class AoPoloComponent implements OnInit{
  ngOnInit(): void {
    console.log("onitnit");
    this.getProduct();
  }
  constructor(private ProductService : ProductService){}
  products: Product[] = [];
  poloCafe: Product[] = [];
  poloExcool: Product[] = [];
  poloActive: Product[] = [];
  getProduct(){
    this.ProductService.getAllProductsv1().pipe(
      map(response => response.filter((product: { categoryId: number; }) => product.categoryId == 1))
    ).subscribe(data =>{
      this.products = data;
      this.products.forEach(element => {
        if(element.productTypeId == 1){
          this.poloCafe.push(element)
        }
        if(element.productTypeId == 2){
          this.poloExcool.push(element)
        }
        if(element.productTypeId == 3){
          this.poloActive.push(element)
        }
      });
    })
  }

}
