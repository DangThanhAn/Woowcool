
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product} from '../../models/product';
import { AfterViewInit, Component, OnInit ,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastMessageComponent } from 'src/app/components/toast-message/toast-message.component';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit,AfterViewInit {
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
    const productIDFromRoute = Number(routeParams.get('productID'));
    this.getProduct(productIDFromRoute);

  }

  getProduct(productIDFromRoute: number) {
    this.productsService.getAllProducts().subscribe((data)=>{
      this.products = data;
      this.product = this.products.find(x => x.productID == productIDFromRoute);
      this.product.quanlity = 1;
      // khởi tạo giá trị mặc định cho màu sắc
      this.colorConvert = this.product.color[0].colorText;
      this.product.colorCurrent = this.colorConvert;
    });
  }
  ngAfterViewInit(): void {
  }
  selectedIndex = 0;
  selectedColor(index:number){
    this.selectedIndex=index; // chọn màu
    this.product.colorCurrent = this.product.color[index].colorText;
    this.isActive = index; // Chọn object hình ảnh của màu đó
    this.imgBindding =""; // reset giá trị gốc của hình bdding
    this.isCurrent=0; // reset hình nhỏ về hình đầu tiên
    for (let index = 0; index < this.product.color.length; index++) {
      const element = this.product.color[index];
      let colorTmp = element.colorText;
      if(index == this.selectedIndex){
        this.colorConvert = colorTmp;
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
    this.toastMessageComponent?.changeH4Content("Đã thêm vào giỏ hàng",false);

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
    this.toastMessageComponent?.changeH4Content("Vui lòng chọn biến thể",true);
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
    this.toastMessageComponent?.changeH4Content("Đã thêm vào giỏ hàng",false);

  }

}
