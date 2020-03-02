import { Injectable } from '@angular/core';
import { Order } from 'app/model/Order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    protected http: HttpClient
  ) { }

  public getListOrder(): Observable<any> {
    return this.http.get('https://localhost:44329/order/list-order');
  }
  public getOrder(orderId): Observable<any> {
    return this.http.get('https://localhost:44329/order/list-order/' + orderId);
  }
  public addOrder(order: any): Observable<any> {
    return this.http.post('https://localhost:44329/order/add-order', order);
  }
  public filterByOrderId(orderId?: number): Observable<any>{
    if(orderId) {
      return this.http.get('https://localhost:44329/order/list-order/' + orderId);
    }
    return this.getListOrder();
  }
  public filterByDate(dateFrom?: string, dateTo?: string): Observable<any>{
     return this.http.get('https://localhost:44329/order/filter/?dateFrom=' + dateFrom + '&dateTo=' + dateTo);
  }
  public deleteOrder(order: Order): Observable<any> {
   // this.listOrder = this.listOrder.filter(i => i.orderId !== order.orderId);
   return this.http.delete('https://localhost:44329/order/delete/' + order.orderId);

  }
  public updateOrder(order: Order): Observable<any> {
    return this.http.put('https://localhost:44329/order/update', order);
  }
}
