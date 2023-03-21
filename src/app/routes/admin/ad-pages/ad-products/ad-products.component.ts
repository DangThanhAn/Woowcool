import { CollectionService } from './../../../service/collection.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from './../../../../services/product.service';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../../models/product';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../../service/app.layout.service';
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
  providers: [MessageService]
})
export class AdProductsComponent implements OnInit{

  productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: any = {

    };
    categories: Category[] = [];
    collections: Collection[] = [];
    productTypes: ProductType[] = [];
    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
      private productService: ProductService,
      private messageService: MessageService,
      private collectionService:CollectionService
      ) { }

    ngOnInit() {
        this.productService.getProducts().subscribe((data) => this.products = data);
        this.collectionService.getCategory().subscribe((data) => this.categories = data);
        this.collectionService.getCollection().subscribe((data) => this.collections = data);
        this.collectionService.getProductType().subscribe((data) => this.productTypes = data);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        // this.product = this.product;
        // this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.productId);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = this.product;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.productName?.trim()) {
            if (this.product.productId) {
                // @ts-ignore
                this.products[this.findIndexById(this.product.productId)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.productId = this.createId();
                // this.product.code = this.createId();
                this.product.images[0].imgUrl = 'product-placeholder.svg';
                // @ts-ignore
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = this.product;
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): number {
      const min = 10000;
      const max = 99999;
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }



    // file
    uploadedFiles: any[] = [];
    onUpload(event: any) {
      for (const file of event.files) {
          this.uploadedFiles.push(file);
      }

      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  onBasicUpload() {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }


}
