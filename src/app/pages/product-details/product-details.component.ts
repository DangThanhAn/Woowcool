import { UserService } from 'src/app/services/user.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product} from '../../models/product';
import { ProductType} from '../../models/productType';

import { AfterViewInit, Component, OnInit ,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
import { CartDetail } from 'src/app/models/CartDetails';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit,AfterViewInit {
  productType :ProductType|any;
  productTypes :ProductType[]=[];
  product :Product|any;
  products: Product[]=[];

  listProductRecommendation: Product[]=[];
  constructor(
    private route: ActivatedRoute,
    private productsService:ProductService,
    private router: Router,
    private cartService: CartService,
    private UserService: UserService,
    )  {

   }
  @ViewChild(ToastMessageComponent) toastMessageComponent: ToastMessageComponent | undefined;

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIDFromRoute = Number(routeParams.get('id'));
    this.idProduct = productIDFromRoute;
    this.getProduct(productIDFromRoute);
    this.getProductType();
    this.getCartByOfUser();
    this.getReview(productIDFromRoute);
    this.getRecommendation();
  }
  idProduct = 0;
  getProduct(productIDFromRoute: number) {
    this.productsService.getProductById(productIDFromRoute).subscribe((data)=>{
      this.product = data;
      console.log(this.product);
      this.product.quantityOrder = 1;
      // khởi tạo giá trị mặc định cho màu sắc
      this.colorConvert = this.product.colors[0].colorText;
      this.product.colorCurrent = this.colorConvert;
    });
  }
  ListReview:any[] = [];
  noData:boolean = false;
  starAverage:number =0;
  getReview(productId:number){
    this.productsService.getReviewOfProduct(productId).subscribe((data)=>{
      console.log("get review success");
      this.ListReview = data;
      this.ListReview.length > 0 ? this.noData = true : this.noData = false;
      this.ListReview.forEach(element => {
        this.productsService.getUserReviewProduct(element.userId).pipe(map( value => value.userName))
        .subscribe((data)=>{
          element.username = data;
        })
        this.starAverage += element.rating;
      });
      console.log(this.ListReview);
    })
  }
  getProductType(){
    this.productsService.getProductType().subscribe((data)=>{
      this.productTypes = data;
      this.productType = this.productTypes.find(x => x.productTypeId === this.product.productTypeId);
    });
  }
  getRecommendation(){
    this.productsService.getListRecommendation(this.currentUser.id).subscribe((res)=>{
      this.listProductRecommendation = res;
      if(res){
        this.listProductRecommendation.forEach(element => {
          if(element.id == this.idProduct){
            this.listProductRecommendation = this.listProductRecommendation.filter(element => element.id !== this.idProduct);
          }

        });
      }
      console.log("getListRecommendation success!",this.listProductRecommendation);
    })
  }

  ngAfterViewInit(): void {
  }
  selectedIndex = 0;
  selectedColor(index:number){
    this.selectedIndex=index; // chọn màu
    console.log(this.selectedIndex);
    this.product.colorCurrent = this.product.colors[index].colorText;
    console.log(this.product.colorCurrent);

    this.isActive = index; // Chọn object hình ảnh của màu đó
    this.imgBindding =""; // reset giá trị gốc của hình bdding
    this.isCurrent=0; // reset hình nhỏ về hình đầu tiên
    for (let index = 0; index < this.product.colors.length; index++) {
      const element = this.product.colors[index];
      let colorTmp = element.colorText;
      if(index == this.selectedIndex){
        this.colorConvert = colorTmp;
        console.log(this.colorConvert );

      }
    }
  }
  isActive = 0;
  colorCurrent:string|undefined;
  size:string|undefined;
  color:string|undefined;
  colorConvert:string|undefined;
  //
  isCurrent = 0 // Biến để lưu trạng thái active Ảnh hiện tại
  imgBindding:string|undefined;
  chooseImgItem(index : number,itemImg:string){
    this.isCurrent = index;
    this.imgBindding = itemImg;

  }
  isDisable:boolean = false;

  isShowToast:boolean = false;
  isChoose:number|any;

  setSize(index:number,event:any){
    this.size = event.target.value.toUpperCase();
    console.log(index,this.size);
    this.isChoose = index;
    this.hasError = false;
    this.product.sizeOrder = this.size;
    this.result = true;
    this.toastMessageComponent?.changeH4Content("Đã thêm vào giỏ hàng",'',true);
  }

  formatRatingAvg(value:number){
    return (Math.round(value * 10) / 10).toFixed(1);
  }
  // Xử lí toast message
  // Nếu chưa chọn size thì show toast message
  result:boolean|any;
  checkChooseSize(){
    this.result = (this.size =="" || this.size ==null) ? this.isShowToast = true : this.isShowToast = false
  }
  // Có lỗi thì show toast
  hasError:boolean=false;
  showError(){
    this.isShowToast = true;
    this.hasError = true;
    this.returnValue();
    this.toastMessageComponent?.changeH4Content("Vui lòng chọn biến thể",'error',false);
  }
  returnValue(){
    setTimeout(() => {
      this.isShowToast = false;
    }, 3000);
  }

  // Tăng giảm số lượng sản phẩm
  count:number= 1;
  countSub(){
    if(this.count > 1)
      this.count--;
    this.product.quantityOrder = this.count;
  }
  countAdd(){
    let checkValidQuantity = 0;
    this.product.sizes.forEach((element: any) => {
      if(element.sizeText === this.product.sizeOrder)
        checkValidQuantity = element.quantityAvalible;
    });

    if(this.count < checkValidQuantity){
      this.count++;
    }else{
      if(checkValidQuantity === 0){
        this.isShowToast = true;
        this.returnValue();
        this.toastMessageComponent?.changeH4Content("Vui lòng chọn biến thể!",'error',false);
      }else{
        this.isShowToast = true;
        this.returnValue();
        this.toastMessageComponent?.changeH4Content("Đã đạt số lượng tối đa!",'error',false);
      }
    }
    this.product.quantityOrder = this.count;
  }
  // Add cart

  addToCart(product: Product) {
  console.log(product);

  // Check login
  const token = localStorage.getItem('access_token');
  if (token && token !== '') {
    // Đã đăng nhập → gọi API như cũ
    this.currentUser = this.UserService.getUserFromToken(token);
    
    var cartDetail: CartDetail = {
      cartId: this.cartId,
      productId: product.id,
      size: product.sizeOrder || "",
      color: product.colorCurrent || "",
      quantity: product.quantityOrder || 1,
    };

    this.cartService.addToCart(cartDetail).subscribe({
      next: (res) => {
        console.log(res);
        this.isShowToast = true;
        this.returnValue();
        this.toastMessageComponent?.changeH4Content("Đã thêm vào giỏ hàng", '', true);
      },
      error: (err) => {
        console.log(err);
        this.isShowToast = true;
        this.returnValue();
        this.toastMessageComponent?.changeH4Content("Đã xảy ra lỗi!", 'error', false);
      }
    });
  } else {
    // Chưa đăng nhập → Lưu vào localStorage
    this.addToGuestCart(product);
  }
}


addToGuestCart(product: Product) {
  const cart = JSON.parse(localStorage.getItem('guest_cart') || JSON.stringify({
    id: 0, // hoặc random/mặc định
    userId: 0, // guest nên là 0 hoặc null
    totalPrice: 0,
    quantity: 0,
    cartDetails: [],
    user: null
  }));

  // Tìm xem sản phẩm với size + color đã tồn tại chưa
  const existingIndex = cart.cartDetails.findIndex((item: any) =>
    item.productId === product.id &&
    item.size === product.sizeOrder &&
    item.color === product.colorCurrent
  );

  const price = product.price || 0;
  const quantityToAdd = product.quantityOrder || 1;

  if (existingIndex > -1) {
    cart.cartDetails[existingIndex].quantity += quantityToAdd;
  } else {
    cart.cartDetails.push({
      cartDetailId: Date.now(), // tạo ID tạm thời
      cartId: cart.id,
      productId: product.id,
      size: product.sizeOrder || '',
      color: product.colorCurrent || '',
      price: price,
      quantity: quantityToAdd,
      product: product // Lưu toàn bộ object product
    });
  }

  // Cập nhật lại tổng số lượng và giá
  cart.quantity = cart.cartDetails.reduce((sum: number, item: any) => sum + item.quantity, 0);
  cart.totalPrice = cart.cartDetails.reduce((sum: number, item: any) => sum + item.quantity * item.price, 0);

  // Lưu lại vào localStorage
  localStorage.setItem('guest_cart', JSON.stringify(cart));

  // Thông báo UI
  this.isShowToast = true;
  this.returnValue();
  this.toastMessageComponent?.changeH4Content("Đã thêm vào giỏ hàng (khách)", '', true);
}



  // addToCart(product: Product) {
  //   console.log(product);
  //   var cartDetail: CartDetail = {
  //     cartId: this.cartId,
  //     productId: product.id,
  //     size: product.sizeOrder || "",
  //     color: product.colorCurrent || "",
  //     quantity: product.quantityOrder|| 1,
  //   };

  //   this.cartService.addToCart(cartDetail).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       this.isShowToast = true;
  //       this.returnValue();
  //       this.toastMessageComponent?.changeH4Content("Đã thêm vào giỏ hàng",'',true);
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //       this.isShowToast = true;
  //       this.returnValue();
  //       this.toastMessageComponent?.changeH4Content("Vui lòng đăng nhập để sử dụng!",'error',false);
  //     }
  //   })
  // }



  currentUser:any;
  cartId:number = 0;
  getCartByOfUser() {

    let token = localStorage.getItem('access_token');
    if (!(token == null || token == '')) {
      this.currentUser = this.UserService.getUserFromToken(token);
      this.cartService.getCart(this.currentUser.id).subscribe((data) => this.cartId=data[0].id);
    }else{
      this.cartId = 0;
    }

  }


}
