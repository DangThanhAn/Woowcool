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
  type:any[]=[];
  constructor(private ProductService : ProductService){
    this.type = [
      {key:'type',value:'Loại sản phẩm'},

      {key:'aopolo',value:'Áo polo'}
    ];
  }
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

  mapSortValue(event:any){
    console.log(event);
    switch (event.key) {
      case 'price-asc':
        this.selectedSort=event.value;
        this.poloCafe.sort((a, b) => a.price - b.price);
        this.poloExcool.sort((a, b) => a.price - b.price);
        this.poloActive.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.selectedSort=event.value;
        this.poloCafe.sort((a, b) => b.price - a.price);
        this.poloExcool.sort((a, b) => b.price - a.price);
        this.poloActive.sort((a, b) => b.price - a.price);
        break;
      case 'percent':

      break;
      default:
        break;
    }
  }
  selectedSort:string="";
  removeAllFilter(){
    this.selectedSort="";
    this.getProduct();
  }


}
