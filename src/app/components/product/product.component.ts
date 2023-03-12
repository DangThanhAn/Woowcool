import { Component, Input } from '@angular/core';
import { Product } from './../../models/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  constructor() { }
  @Input() srcCollectionImg : string ='';
  @Input() isCollectionImg = false;
  @Input() isLoadmore = false;
  @Input() isProduct = true;

  @Input() isSale = false;
  @Input() isBestSeller = false;
  @Input() isNew = true;

  @Input() isProductAtDashboard = false;

  @Input() product: Product| any;
  @Input() bgColor?:string|any;
  @Input() color?:string|any;
  @Input() bgColorSale?:string|any;
  @Input() ColorSale?:string|any;

  item?: string;
  selectedIndex = 0;
  selectedColor(index:number){
    this.selectedIndex = index;
  }
}
