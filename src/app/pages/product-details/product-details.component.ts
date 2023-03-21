import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product} from '../../models/product';
import { ProductType} from '../../models/productType';

import { AfterViewInit, Component, OnInit ,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';

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
    )  {

   }
  @ViewChild(ToastMessageComponent) toastMessageComponent: ToastMessageComponent | undefined;

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIDFromRoute = Number(routeParams.get('id'));
    this.getProduct(productIDFromRoute);
    this.getProductType();
  }

  getProduct(productIDFromRoute: number) {
    this.productsService.getAllProducts().subscribe((data)=>{
      this.products = data;
      this.product = this.products.find(x => x.id == productIDFromRoute);
      console.log(this.product);
      this.product.quanlity = 1;
      // khởi tạo giá trị mặc định cho màu sắc
      this.colorConvert = this.product.colors[0].colorText;
      this.product.colorCurrent = this.colorConvert;
    });
  }

  getProductType(){
    this.productsService.getProductType().subscribe((data)=>{
      this.productTypes = data;
      this.productType = this.productTypes.find(x => x.productTypeId == this.product.productTypeId);
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

  isShowToast:boolean = false;
  setSize(event:any){
    this.size = event.target.value.toUpperCase();
    this.product.sizeCurrent = this.size;
    this.result = true;
    this.toastMessageComponent?.changeH4Content("Đã thêm vào giỏ hàng",'',true);

  }

  // Xử lí toast message
  // Nếu chưa chọn size thì show toast message
  result:boolean|any;
  checkChooseSize(){
    this.result = (this.size =="" || this.size ==null) ? this.isShowToast = true : this.isShowToast = false
  }
  // Có lỗi thì show toast
  showError(){
    this.isShowToast = true;
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
    this.count--;
    this.product.quanlity = this.count;
  }
  countAdd(){
    this.count++;
    this.product.quanlity = this.count;
  }
  // Add cart
  addToCart(product: Product) {
    console.log(product);

    this.cartService.addToCart(product).subscribe({
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

}
