import { UserService } from 'src/app/services/user.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Review } from 'src/app/models/Review';
import { Rating } from 'primeng/rating';
interface HistoryOrder {
  id: number;
  userId: number;
  orderDate: Date;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  details: any;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [MessageService],
})
export class OrdersComponent implements OnInit {
  constructor(
    private UserService: UserService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getOrderHistoryByUserId();
  }
  ListOrderHistory: HistoryOrder[] = [];
  getOrderHistoryByUserId() {
    this.UserService.GetAllOrderHistoryByUserId(this.currentUser.id)
      .pipe(
        map((data: any) => {
          this.ListOrderHistory = data;
          for (let index = 0; index < this.ListOrderHistory.length; index++) {
            this.UserService.GetDetailsByOrderId(
              this.ListOrderHistory[index].id
            ).subscribe((data) => {
              this.ListOrderHistory[index].details = data;
            });
          }
          return this.ListOrderHistory;
        })
      )
      .subscribe(() => console.log(this.ListOrderHistory));
  }

  currentUser: any;
  getUser() {
    let token = localStorage.getItem('access_token');
    if (!(token == null || token == '')) {
      this.currentUser = this.UserService.getUserFromToken(token);
    }
  }
  isShow = false;
  commendSuccess = false;
  productIdCurrent:number = 0;
  showPopupReview(productId: number) {
    this.productIdCurrent = productId;
    this.isShow = true;
  }
  ratingStar: number = 0;
  contentCommend:string ="";
  sendReview() {
    let currentDate = new Date();
    let isoDate = currentDate.toISOString();
    let myComment = {
      ProductId: this.productIdCurrent,
      UserId: this.currentUser.id,
      Rating: this.ratingStar,
      Comment: this.contentCommend,
      CreatedDate: isoDate,
    };
    try {
      this.UserService.postReview(myComment).subscribe((data) => {
        console.log(data);
        this.isShow = false;
        this.commendSuccess = true;
      });
    } catch (error) {

    }

  }
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('close-popup')) {
      this.isShow = false;
      this.commendSuccess = false;
    }
  }
}
