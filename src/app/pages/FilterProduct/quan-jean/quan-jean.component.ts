import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-quan-jean',
  templateUrl: './quan-jean.component.html',
  styleUrls: ['./quan-jean.component.css']
})
export class QuanJeanComponent implements OnInit{
  ngOnInit(): void {
    this.getProduct();
  }
  constructor(private ProductService : ProductService){}
  products: Product[] = [];
  getProduct(){
    this.ProductService.getAllProductsv1().pipe(
      map(response => response.filter((product: { categoryId: number; }) => product.categoryId == 4))
    ).subscribe(data =>{
      this.products = data;
    })
  }

  selectedSort:string='';
  mapSortValue(event:any){
    console.log(event);
    switch (event.key) {
      case 'price-asc':
        this.selectedSort=event.value;
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.selectedSort=event.value;
        this.products.sort((a, b) => b.price - a.price);
        break;
      case 'percent':

      break;
      default:
        break;
    }
  }
}
