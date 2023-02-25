import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, HostListener, HostBinding, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css'],
})
export class InputSearchComponent implements OnInit,AfterViewInit {
  constructor(private productService:ProductService,private elemRef: ElementRef) { }
  @Input() hasSearch = true;
  @Output() offClick = new EventEmitter();
  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('link') linkElement!: ElementRef;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) =>{
      this.listProducts = data;
    })
  }
  listProducts: Product[] = [];
  searchText: any;
  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }
  blurInputSearch(){
    this.offClick.emit();
  }
}
