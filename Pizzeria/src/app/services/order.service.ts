import { Injectable } from '@angular/core';
import { Order } from 'app/model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public listOrder: Order[] = new Array();

  constructor() { }

  public getListOrder() {
    return this.listOrder;
  }
  public addOrder(order: Order) {
    this.listOrder.push(order);
  }
}
