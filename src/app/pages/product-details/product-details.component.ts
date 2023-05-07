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
    this.getProduct(productIDFromRoute);
    this.getProductType();
    this.getCartByOfUser();
    this.getReview(productIDFromRoute);
  }

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
    var cartDetail: CartDetail = {
      cartId: this.cartId,
      productId: product.id,
      size: product.sizeOrder || "",
      color: product.colorCurrent || "",
      quantity: product.quantityOrder|| 1,
    };

    this.cartService.addToCart(cartDetail).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this.isShowToast = true;
    this.returnValue();
    this.toastMessageComponent?.changeH4Content("Đã thêm vào giỏ hàng",'',true);
  }
  currentUser:any;
  cartId:number = 0;
  getCartByOfUser() {
    let token = localStorage.getItem('access_token');
    if (!(token == null || token == '')) {
      this.currentUser = this.UserService.getUserFromToken(token);
    }
    this.cartService.getCart(this.currentUser.id).subscribe((data) => this.cartId=data[0].id);
  }
}
