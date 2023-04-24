import { AdminUserService } from './../../../service/admin-user.service';
import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { CollectionService } from 'src/app/routes/service/collection.service';
import { map } from 'rxjs';


interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-ad-blog',
  templateUrl: './ad-blog.component.html',
  styleUrls: ['./ad-blog.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AdBlogComponent {

  dataMo:any[] = [];


  @ViewChild('filter') filter!: ElementRef;

  constructor(private AdminUserService: AdminUserService) { }

  ngOnInit() {
    // this.getCollections();
    this.getDataMO();
  }
  getDataMO(){
    this.AdminUserService.getDataViewMO().subscribe((data)=>{
      this.dataMo = data;
      console.log(this.dataMo);

    })
  }

}
