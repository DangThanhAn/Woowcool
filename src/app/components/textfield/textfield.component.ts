import { FormControl,FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent implements OnInit
 {
  constructor() { }

  @Input() widthExp : string | undefined;
  @Input() contentPlacehoder : string | any;
  @Input()contentLabel:string|any;

  ngOnInit(): void {

  }
  emptyPlacehoder = "";

}
