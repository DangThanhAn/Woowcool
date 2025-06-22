import { AdminUserService } from './../../../service/admin-user.service';
import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { CollectionService } from 'src/app/routes/service/collection.service';
import { map } from 'rxjs';
import { FormatDatePipe } from 'src/app/pipes/formatDate.pipe';


interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-ad-blog',
  templateUrl: './ad-blog.component.html',
  styleUrls: ['./ad-blog.component.css'],
  providers: [MessageService]
})
export class AdBlogComponent implements OnInit{

  dataMo:any[] = [];
  user:any[] = [];

  orderItemDialog: boolean = false;

  OrderItem: any ={};

  mode=false;
  name : string = "";

  @ViewChild('filter') filter!: ElementRef;

  constructor(private AdminUserService: AdminUserService,private messageService: MessageService
    ) { }

  ngOnInit() {
    // this.getCollections();
    this.getDataMO();
  }
  getDataMO() {
  this.AdminUserService.getDataViewMO().subscribe((data: any[]) => {
    if (data && data.length > 0) {
      this.dataMo = data.map((item: any) => {
        item.user = item.user ?? {
          id: 0,
          userName: 'Guest',
          dateOfBirth: null,
          email: '',
          sex: null,
          address: '',
          city: '',
          phone: '',
          role: 'guest',
          height: null,
          weight: null,
          password: null,
          carts: [],
          orders: [],
          reviews: []
        };
        return item;
      });
    } else {
      this.dataMo = [];
    }

    console.log(this.dataMo);
  });
}

  updateStatusOrder(order:any){
    this.OrderItem = {...order}
    this.name= this.OrderItem.user.userName;
    console.log(this.OrderItem);
    this.orderItemDialog = true;
  }
  hideDialog(){
    this.orderItemDialog= false;
  }
  Save(value:any){
    this.AdminUserService.updateStatusOrder(value.id,value.status.toString()).subscribe((res)=>{
      if(res){
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Cập nhật trạng thái đơn hàng thành công!',
          life: 3000,
        });
      }
    },
    ()=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Cập nhật trạng thái đơn hàng thành công!',
        life: 3000,
      });
      this.hideDialog();
      this.getDataMO();
    }
    );

  }
}
