import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { CollectionService } from 'src/app/routes/service/collection.service';
import { map } from 'rxjs';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-ad-statistics',
  templateUrl: './ad-statistics.component.html',
  styleUrls: ['./ad-statistics.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AdStatisticsComponent  implements OnInit{


  collections:any[]=[];
  categories:any[]=[];
  statuses: any[] = [];

  rowGroupMetadata: any;

  expandedRows: expandedRows = {};

  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  idFrozen: boolean = false;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private collectionService: CollectionService) { }

  ngOnInit() {
    // this.getCollections();
    this.getCategories();
    this.menuItems = [
      {
        label: 'Sửa',
        icon: 'pi pi-fw pi-pencil',
      },
      {
        label: 'Xóa',
        icon: 'pi pi-fw pi-question-circle',
      },
    ];
  }
  getCategories(){
    this.collectionService.getCategory().subscribe((data)=>{
      this.categories = data;
      for (let index = 0; index < this.categories.length; index++) {
        this.categories[index].isShow = false;
      }
    })
  }
  menuItems: MenuItem[] | any;
  rowIndex:number = 0;
  openListAction(index:number){
    this.categories[index].isShow = !this.categories[index].isShow;
  }
  menuItemClicked(menuItem: MenuItem) {
    console.log(menuItem);
  }


  expandAll() {
      if (!this.isExpanded) {
          this.collections.forEach(collection => collection && collection.collectionName ? this.expandedRows[collection.collectionName] = true : '');

      } else {
          this.expandedRows = {};
      }
      this.isExpanded = !this.isExpanded;
  }

  formatCurrency(value: number) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
}
