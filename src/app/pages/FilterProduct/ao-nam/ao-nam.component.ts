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
  selector: 'app-ao-nam',
  templateUrl: './ao-nam.component.html',
  styleUrls: ['./ao-nam.component.css']
})
export class AoNamComponent implements OnInit{
  cities: Category[];
  sort: SortProduct[];
  selectedSort:string="";
  ngOnInit(): void {
    this.getProduct();
  }
  constructor(private ProductService : ProductService,private router: Router) {
    this.cities = [
        {name: 'Danh mục', code: 'default'},
        {name: 'Áo polo', code: 'ao-polo'},
        {name: 'Áo Tank Top', code: 'ao-tank-top'},
        {name: 'Áo Thể Thao', code: 'ao-the-thao'}
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
    case 'ao-polo':
      this.router.navigate(['filter-product/ao-polo']);
      break;
    case 'ao-tank-top':
      this.router.navigate(['/filter-product/ao-tank-top']);
      break;
    case 'ao-the-thao':
      this.router.navigate(['filter-product/ao-the-thao']);
      break;
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
      map(response => response.filter((product: { collectionId: number; }) => product.collectionId == 1))
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
