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
  selector: 'app-phu-kien',
  templateUrl: './phu-kien.component.html',
  styleUrls: ['./phu-kien.component.css']
})
export class PhuKienComponent {
  cities: Category[];
  sort: SortProduct[];
  selectedSort:string="";
  ngOnInit(): void {
    this.getProduct();
  }
  constructor(private ProductService : ProductService,private router: Router) {
    this.cities = [
        {name: 'Danh mục', code: 'default'},
        {name: 'Mũ nón', code: 'mu-non'},
        {name: 'Tất vớ', code: 'tat-vo'}
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
    case 'mu-non':
      this.router.navigate(['filter-product/mu-non']);
      break;
    case 'tat-vo':
      this.router.navigate(['/filter-product/tat-vo']);
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
      map(response => response.filter((product: { collectionId: number; }) => product.collectionId == 3))
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
