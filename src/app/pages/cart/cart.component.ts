import { InfoPaymentMomoService } from './../../services/paymentService.service';
import { CartDetail } from './../../models/CartDetails';
import { UserService } from './../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';


import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Order } from 'src/app/models/Order';
import { OrderDetail } from 'src/app/models/OrderDetail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private fb: FormBuilder,
    private UserService: UserService,
    private paymentService: InfoPaymentMomoService,
    private router: Router
  ) {}
  async ngOnInit(): Promise<void> {
    await this.getUser();
    await this.getUserPesent();
    await this.getDataProvince();
    await this.selectAdderss();
    await this.getCartByOfUser();
  }
  dataSource: any;
  // Sử dụng form
  inforCustomer = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phonenumber: ['', Validators.required],
    email: ['', Validators.required],
    note: [''],
    selectedProvince: [''],
    selectedDistrict: [''],
    selectedWard: [''],
  });
  selectedPaymentMethod: string = 'COD';

  // end form
  currentUser: any;
  getUser() {
    let token = localStorage.getItem('access_token');
    if (!(token == null || token == '')) {
      this.currentUser = this.UserService.getUserFromToken(token);
    }
  }
  getUserPesent(){
    this.UserService.getInforUserById(this.currentUser.id).subscribe((data) => {
      this.currentUser = data;
      this.inforCustomer.setValue({
        name: this.currentUser.userName,
        address: this.currentUser.address,
        phonenumber: this.currentUser.phone,
        email: this.currentUser.email,
        note: '',
        selectedProvince: '',
        selectedDistrict: '',
        selectedWard: '',
      });
    });
  }
  totalCoin: number = 0;
  listTotal: number[] = [];
  getCartByOfUser() {
    console.log("User ",this.currentUser);
    this.cartService.getCart(this.currentUser.id).subscribe({
      next: (res) => {
        this.dataSource = res;
        console.log(this.dataSource);
        // console.log(this.dataSource[0].cartDetails[0].product.images[0].imgUrl);
        // console.log(this.dataSource[0].cartDetails[0].product.price);
        // console.log(this.dataSource[0].cartDetails[0].quantity);
        this.listTotal.splice(0, this.listTotal.length);
        for (const iterator of this.dataSource[0].cartDetails) {
          this.listTotal.push(iterator.product.price * iterator.quantity);
        }
        this.totalCoin = this.listTotal.reduce(
          (total: number, value: number) => {
            return total + value;
          },
          0
        );
        let payShipping = this.totalCoin > 200000 ? 0 : 25000;
        this.totalCoin+=payShipping;
        console.log(this.totalCoin);
        this.cartService
          .updateTotalPrice(this.dataSource[0].id, this.totalCoin)
          .subscribe(() => {
            console.log('updated');
          });
      },
      error: (err) => {
        console.log('Co loi khi goi api get data' + err);
      },
    });
  }



  /**
   * Hàm tăng giảm số lượng
   * Author: DT An
   * 14/12/22
   */
  countAdd(id: number, quanlity: number) {
    quanlity++;
    this.cartService.updateSize(id, quanlity).subscribe(() => {
      console.log("click add",this.currentUser);

      this.getCartByOfUser();
    });
  }
  countSub(id: number, quanlity: number) {
    quanlity--;
    this.cartService.updateSize(id, quanlity).subscribe(() => {
      this.getCartByOfUser();
    });
  }
  /**
   * Hàm xóa sản phẩm current
   * Author: DT An
   * 14/12/22
   */
  deleteCD(id: number) {
    this.cartService.deleteCD(id).subscribe(() => {
      this.getCartByOfUser();
    });
  }

  provinces: any[] = [];
  selectedProvince: string | any;
  districts: any[] = [];
  selectedDistrict: string | any;
  wards: any[] = [];
  selectedWard: string | any;

  getDataProvince() {
    this.http
      .get<any>('../../../../assets/dataProvince/treeVN.min.json')
      .subscribe((data) => {
        this.provinces = [
          ...new Set(data.map((item: { city: any }) => item.city)),
        ];
      });
  }
  getDistrictsByCity(cityName: string) {
    this.http
      .get<any>('../../../../assets/dataProvince/treeVN.min.json')
      .subscribe((data) => {
        this.districts = [
          ...new Set(
            data
              .filter((item: { city: string }) => item.city === cityName)
              .map((item: { district: any }) => item.district)
          ),
        ];
      });
  }
  getWardsByDistrict(district: string) {
    this.http
      .get<any>('../../../../assets/dataProvince/treeVN.min.json')
      .subscribe((data) => {
        this.wards = [
          ...new Set(
            data
              .filter(
                (item: { district: string }) => item.district === district
              )
              .map((item: { ward: any }) => item.ward)
          ),
        ];
      });
  }
  selectAdderss() {
    this.inforCustomer.controls['selectedProvince'].valueChanges.subscribe(
      (selectedProvince) => {
        if (selectedProvince == null) selectedProvince = '';
        this.getDistrictsByCity(selectedProvince);
      }
    );

    this.inforCustomer.controls['selectedDistrict'].valueChanges.subscribe(
      (selectedDistrict) => {
        if (selectedDistrict == null) selectedDistrict = '';
        this.getWardsByDistrict(selectedDistrict);
      }
    );
  }

  /**
   * Với paymentMethod là momo
   */
  qrCode: string | any;
  paymentWithMomo(amount: number,orderId: string,orderInfo: string){
    const partnerCode = 'MOMO1234567';
    const accessKey = '12345678912345678912';
    const secretKey = 'YOUR_SECRET_KEY';
    const requestId = '123123';

    const returnUrl = '/checkout';
    const notifyUrl = '/admin';

    const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}`;
    const hmacSignature = CryptoJS.HmacSHA256(rawSignature, secretKey);
    const signature = CryptoJS.enc.Hex.stringify(hmacSignature);
    console.log(signature);

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount: amount.toString(),
      orderId: orderId.toString(),
      orderInfo: orderInfo,
      returnUrl,
      notifyUrl,
      extraData: '',
      requestType: 'captureMoMoWallet'
    };
    console.log(requestBody);

    const headers = {
      'Content-Type': 'application/json',
      'X-Request-Id': requestId,
      'X-Partner-Code': partnerCode,
      'X-Access-Key': accessKey,
      'X-Signature': signature.toString()
    };
    console.log(headers);
    console.log(requestBody);
    this.http.post('/api/transactionProcessor', requestBody, { headers })
      .subscribe((response: any) => {
        if (response.errorCode === 0) {
          this.qrCode = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${response.payUrl}`;
          console.log(this.qrCode);

        } else {
          alert('Failed to create MoMo QR code: ' + response.localMessage);
        }
      });

  }

  loading: boolean = false;
  /**
   * Khi click thanh toán sẽ xử lí
   * 1. Validate form: nếu thông tin nhập còn thiếu thì hiển thị thông báo cho người dùng
   * 2. Navigate tới trang thanh toán thành công và clear giỏ hàng.
   */
  onSubmit(): void {
    this.loading = true;
    console.warn('Your order has been submitted', this.inforCustomer.value);
    console.log(this.selectedPaymentMethod);
    console.log(this.dataSource);
    // 1. Post thông tin vào bảng order
    // 2. Post các sản phẩm mua vào order details
    let currentDate = new Date();
    let isoDate = currentDate.toISOString();
    let myOrder: Order = {
      userId: this.dataSource[0].userId,
      orderDate: isoDate,
      totalPrice: this.dataSource[0].totalPrice,
      status: 'Đang chờ xử lý',
      paymentMethod: this.selectedPaymentMethod,
    };

    if (this.dataSource[0].totalPrice > 0) {
      if(this.selectedPaymentMethod === 'momo'){
        this.paymentService.setCartData(this.dataSource);
        setTimeout(() => {
          this.router.navigate(['/payment/momo']);
        }, 2500);
      }else{
        setTimeout(() => {
          this.cartService.createOrder(myOrder).subscribe(
            (newOrder) => {
              this.dataSource[0].cartDetails.forEach(
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
                      this.cartService
                        .clearCart(this.dataSource[0].id)
                        .subscribe(() => {
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
            () =>{
              this.loading = false;
            }
          );
        }, 2500);
      }
    }
  }
}
