import { Product } from './../../models/product';
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

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
  hasError: boolean = false;
  changeH4Content(newContent: string,hasError:boolean) {
    this.content = newContent;
    this.hasError = hasError;
  }
}
