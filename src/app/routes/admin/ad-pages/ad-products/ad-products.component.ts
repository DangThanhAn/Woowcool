import { Image } from './../../../../models/product';
import { CollectionService } from './../../../service/collection.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from './../../../../services/product.service';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../../models/product';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../../service/app.layout.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface ProductType {
  productTypeId: number;
  productTypeName: string;
  describe: string;
  image: string;
}
interface Category {
  categoryId: number;
  categoryName: string;
}
interface Collection {
  collectionId: number;
  collectionName: string;
}
@Component({
  selector: 'app-ad-products',
  templateUrl: './ad-products.component.html',
  styleUrls: ['./ad-products.component.scss'],
  providers: [MessageService],
})
export class AdProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private collectionService: CollectionService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
    this.collectionService.getCategory().subscribe((data) => {
      this.categories = data;
    });
    this.collectionService
      .getCollection()
      .subscribe((data) => (this.collections = data));
    this.collectionService
      .getProductType()
      .subscribe((data) => (this.productTypes = data));
    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' },
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }
  loading: boolean = false;
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: any = {};
  categories: Category[] = [];
  collections: Collection[] = [];
  productTypes: ProductType[] = [];
  selectedProducts: Product[] = [];
  mode: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  checkoutForm = this.fb.group({
    productName: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required],
    sale: ['', Validators.required],
    collectionId: ['', Validators.required],
    categoryId: ['', Validators.required],
    productTypeId: ['', Validators.required],
  });
  images: any = [];
  myUploader(event: any) {
    for (let index = 0; index < event.files.length; index++) {
      this.images.push(
        '../../../../../assets/product/' + event.files[index].name
      );
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: `Bạn vừa tải lên ${event.files.length} ảnh`,
      life: 3000,
    });
  }

  selectedCollections: string | any;
  onSubmit() {
    this.checkoutForm.get('collectionId')?.setValue('1');
    this.checkoutForm.get('categoryId')?.setValue('1');
    this.checkoutForm.get('productTypeId')?.setValue('1');
    if (this.checkoutForm.valid) {
      if (this.mode == true) {
        this.product = this.checkoutForm.value;
        this.product.quantityAvailable =
          this.checkoutForm.get('quantity')?.value;
        this.loading = true;
        this.productService.postProduct(this.product).subscribe(
          (newProduct) => {
            this.postImg(newProduct.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Bạn vừa thêm mới một sản phẩm',
              life: 3000,
            });
            this.checkoutForm.reset();
            this.productDialog = false;
            location.reload();
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: 'Có lỗi khi thêm',
              life: 3000,
            });
          },
          () => {
            this.loading = false;
          }
        );
      } else {
        this.product = this.productEdit;
        this.loading = true;
        this.product.productName =  this.checkoutForm.get('productName')?.value;
        this.product.price =  this.checkoutForm.get('price')?.value;
        this.product.quantity =  this.checkoutForm.get('quantity')?.value;
        this.product.sale =  this.checkoutForm.get('sale')?.value;
        this.productService.putProduct(this.product).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Bạn vừa cập nhật một sản phẩm',
              life: 3000,
            });
            this.checkoutForm.reset();
            this.productDialog = false;
            location.reload();
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: 'Có lỗi khi cập nhật',
              life: 3000,
            });
          },
          () => {
            this.loading = false;
          }
        );
      }
    } else {
      console.log(this.checkoutForm.value);
      this.messageService.add({
        severity: 'error',
        summary: 'Thất bại',
        detail: 'Vui lòng điền đầy đủ thông tin',
        life: 3000,
      });
    }
  }
  image: Image = {
    productId: 0,
    imgUrl: '',
  };
  postImg(id: number): void {
    this.image.productId = id;
    for (let i = 0; i < this.images.length; i++) {
      this.image.imgUrl = this.images[i];
      this.productService.postImg(this.image).subscribe(() => {
        console.log('post img :' + i);
      });
    }
  }
  postSize(): void {}
  postColor(): void {}
  link = '';

  openNew() {
    this.mode = true;
    this.productDialog = true;
  }
  productEdit: any = {};
  editProduct(product: Product) {
    this.mode = false;
    this.product = { ...product };
    this.link = this.product.images[0].imgUrl;
    this.productDialog = true;
    this.productEdit = this.product;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(
      (val) => !this.selectedProducts.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã xóa sản phẩm được chọn',
      life: 3000,
    });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.products = this.products.filter((val) => val.id !== this.product.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã xóa sản phẩm được chọn',
      life: 3000,
    });
    this.product = this.product;
  }

  hideDialog() {
    this.productDialog = false;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
