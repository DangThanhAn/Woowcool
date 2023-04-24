import { Component, Input, Output, EventEmitter } from '@angular/core';
interface SortProduct{
  key:string,
  value:string
}
@Component({
  selector: 'app-dropdown-sort',
  templateUrl: './dropdown-sort.component.html',
  styleUrls: ['./dropdown-sort.component.css']
})
export class DropdownSortComponent {
  constructor(){
    this.sort = [
      {key:'bestseller',value:'Mới nhất'},
      {key:'price-asc',value:'Giá từ thấp đến cao'},
      {key:'price-desc',value:'Giá từ cao tới thấp'},
      {key:'percent',value:'% giảm giá nhiều'}
    ]
  }
  @Input() sort: SortProduct| any;
  @Output() mapSortValue = new EventEmitter();
  onDropdownChange(event:any) {
    this.mapSortValue.emit(event.value);
    }
    selectedSort:string ="";
    selectedSortValue:string="";
  }


