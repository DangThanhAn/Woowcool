import { Router } from '@angular/router';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderDetail } from 'src/app/models/OrderDetail';
import { InfoPaymentMomoService } from 'src/app/services/paymentService.service';

@Component({
  selector: 'app-mo-mo',
  templateUrl: './mo-mo.component.html',
  styleUrls: ['./mo-mo.component.css'],
})
export class MoMoComponent implements OnInit {
  total: number = 0;

  minutes: number = 0;

  seconds: number = 0;

  data: any[] = [];

  loading: boolean = false;

  constructor(
    private paymentService: InfoPaymentMomoService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnInit() {
    this.paymentService.currentCartData.subscribe((data) => {
      this.data = data;
      console.log(this.data);

      this.total = data[0].totalPrice;
    });
    this.minutes = 10;
    this.seconds = 0;
    setInterval(() => {
      this.tick();
    }, 1000);
  }

  paymentSuccess() {
    this.loading = true;
    setTimeout(() => {
      let currentDate = new Date();
      let isoDate = currentDate.toISOString();
      let myOrder: Order = {
        userId: this.data[0].userId,
        orderDate: isoDate,
        totalPrice: this.data[0].totalPrice,
        status: 'Đang chờ xử lý',
        paymentMethod: 'Momo',
      };
      this.cartService.createOrder(myOrder).subscribe(
        (newOrder) => {
          this.data[0].cartDetails.forEach(
            (element: {
              productId: any;
              size: any;
              color: any;
              quantity: any;
            }) => {
              let myOrderDetails: OrderDetail = {
                orderId: newOrder.order.id,
                productId: element.productId,
                size: element.size,
                color: element.color,
                quantity: element.quantity,
              };
              this.cartService
                .createOrderDetails(myOrderDetails)
                .subscribe(() => {
                  //1. Xóa thông tin ở bảng giỏ hàng đi
                  this.cartService.clearCart(this.data[0].id).subscribe(() => {
                    console.log('delete cart details');
                  });
                  //2. Xóa số lượng sản phẩm được đặt đi
                  this.cartService
                    .UpdateQuantityAvailible(myOrderDetails)
                    .subscribe(() => {
                      //3. Router Chuyển đến trang checkout
                      this.router.navigate(['/checkout']);
                    });
                });
            }
          );
        },
        (error) => {
          console.log(error, 'Có lỗi khi đặt hàng');
        },
        () => {
          this.loading = false;
        }
      );
    }, 2500);
  }

  private tick(): void {
    if (this.seconds > 0) {
      this.seconds--;
    } else {
      if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        // Time is up!
      }
    }
  }
}
