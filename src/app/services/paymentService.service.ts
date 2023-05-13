import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InfoPaymentMomoService {
  private cartData = new BehaviorSubject<any>(null);
  public currentCartData = this.cartData.asObservable();

  constructor() { }

  setCartData(data: any) {
    this.cartData.next(data);
    console.log(data,"data from service");
  }
}
