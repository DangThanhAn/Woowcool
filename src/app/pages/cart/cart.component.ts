import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  inforCustomer : FormGroup | any;
  dataSource: any;

  totalCoin: number = 0;
  getItemInCart(){
    this.cartService.getAllItemsInCart().subscribe({
      next:(res) =>{
        this.dataSource = res;
        // Tính tổng tiền giỏ hàng bằng (số lượng từng sản phẩm * đơn giá)  ==> total
        this.totalCoin = this.dataSource.reduce((total:number, dataSource:any)=>{
          return total+ (dataSource.price * dataSource.quanlity);
        },0);
        console.log(this.totalCoin);
      },
      error:(err)=>{
        console.log("Co loi khi goi api get data"+err);
      }
    })
  }

  constructor(
    private cartService: CartService,
  ) {}
  ngOnInit(): void {
    // Sử dụng form
    this.inforCustomer = new FormGroup({
      name: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      phonenumber: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      note: new FormControl(''),
    });
    // end form
    this.getItemInCart();
  }

  /**
   * Hàm tăng giảm số lượng
   * Author: DT An
   * 14/12/22
   */
  countAdd(id: number){
    let currentProduct = this.dataSource.find((x: { id: number; }) => x.id === id);
    currentProduct.quanlity++;
    this.cartService.updateAProduct(currentProduct, currentProduct.id).subscribe(()=>{
      this.getItemInCart(); // cap nhat lai total
    });
  }
  countSub(id: number){
    let currentProduct = this.dataSource.find((x: { id: number; }) => x.id === id);
    currentProduct.quanlity--
    this.cartService.updateAProduct(currentProduct, currentProduct.id).subscribe(()=>{
      this.getItemInCart(); // cap nhat lai total
    });
  }
  /**
   * Hàm xóa sản phẩm current
   * Author: DT An
   * 14/12/22
   */
  deleteAProduct(id: number){
    let currentProduct = this.dataSource.find((x: { id: number; }) => x.id === id);
    this.cartService.deleteAProduct(currentProduct.id).subscribe(()=>{
      this.getItemInCart(); // cap nhat lai gio hang
    });
  }
  /**
   * Khi click thanh toán sẽ xử lí
   * 1. Validate form: nếu thông tin nhập còn thiếu thì hiển thị thông báo cho người dùng
   * 2. Navigate tới trang thanh toán thành công và clear giỏ hàng.
   */
  onSubmit(): void {
    console.log(this.inforCustomer.get('name')?.errors?.required);
    console.warn('Your order has been submitted', this.inforCustomer.value);
  }
}
