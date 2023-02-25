import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit{

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }

  @Output() returnDefaultVal = new EventEmitter();
  isShow:boolean=true;

  checkoutForm = this.formBuilder.group({
    // name : this.formBuilder.control(''),
    // name: ['',[Validators.required,Validators.minLength(3)]],
    email: '',
    // address : this.formBuilder.control(''),
    password:''
  });

  onSubmit():void{
    console.log(this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  closePopup(){
    this.isShow=false;
    this.returnDefaultVal.emit();
  }
}
