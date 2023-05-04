import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';


interface Category {
  name: string,
  code: string
}
interface SortProduct{
  key:string,
  value:string
}
@Component({
  selector: 'app-quan-nam',
  templateUrl: './quan-nam.component.html',
  styleUrls: ['./quan-nam.component.css']
})
export class QuanNamComponent {

  cities: Category[];
  sort: SortProduct[];
  selectedSort:string="";
  ngOnInit(): void {
    this.getProduct();
  }
  constructor(private ProductService : ProductService,private router: Router) {
    this.cities = [
        {name: 'Danh mục', code: 'default'},
        {name: 'Quần jean', code: 'quan-jean'},
        {name: 'Quần kaki', code: 'quan-kaki'}
    ];
    this.sort = [
      {key:'bestseller',value:'Mới nhất'},
      {key:'price-asc',value:'Giá từ thấp đến cao'},
      {key:'price-desc',value:'Giá từ cao tới thấp'},
      {key:'percent',value:'% giảm giá nhiều'}
    ]
}
onDropdownChange(event: any) {
  let selectedValue = event.value.code;
  switch (selectedValue) {
    case 'quan-jean':
      this.router.navigate(['filter-product/quan-jean']);
      break;
    case 'quan-kaki':
      this.router.navigate(['/filter-product/quan-kaki']);
      break
    default:
      break;
  }
}
onDropdownChange1(event: any) {
  let selectedValue = event.value.key;
  this.selectedSort = event.value.value;
  console.log(this.selectedSort);

  switch (selectedValue) {
    case 'price-asc':
      this.products.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      this.products.sort((a, b) => b.price - a.price);
      break;
    case 'percent':

    break;
    default:
      break;
  }
}
  products: Product[] = [];
  getProduct(){
    this.ProductService.getAllProductsv1().pipe(
      map(response => response.filter((product: { collectionId: number; }) => product.collectionId == 2))
    ).subscribe(data =>{
      this.products = data;
    })
  }
  selectedSortValue:string ="";
  removeAllFilter(){
    this.getProduct();
    this.selectedSort="";
    this.selectedSortValue = this.sort[0].value;
  }
}
