import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() contentButton!:string
  @Input() typeButton!:string
  @Input() type!:string
  @Input() backgroundColor:string|any
  @Input() colorText:string|any
  @Input() border:string|any

}
