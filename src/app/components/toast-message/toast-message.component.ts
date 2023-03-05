import { Product } from './../../models/product';
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

export interface ToastMessage {
  textMessage: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent {
  constructor(private elementRef: ElementRef){

  }
  @Input() textMessage:string|any;
  @Input() type:string|any;
  @Output() setDefault = new EventEmitter();
  @Input() product : Product | any;

  @Input() isShowToast = false;

  @Input() result = true;
  content: string = "Initial content";

  addSuccessProduct?: boolean = false;

  changeH4Content(newContent: string,type:String,addSuccessProduct?:boolean) {
    this.content = newContent;
    this.type = type;
    this.addSuccessProduct = addSuccessProduct;
  }
}
