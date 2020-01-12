import { Injectable } from '@angular/core';
import { Order } from 'app/model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public listOrder: Order[] = [
    {
      orderId: 1,
      date: new Date('01-11-2020'),
      phoneNumber:'066419525',
      place:{
        zipCode: 11000,
        township: 'Stari grad'
      },
      street: 'Nemanjina 123',
      totalAmount: 640,
      orderItems:[
        {
          orderId: 1,
          itemId: 1,
          pizza:{
            pizzaId: 1,
            pizzaName: 'Sicilijana',
            description: 'sunka kackavalj masline pecurke',
            price: 300
          },
          amount: 300,
          price: 300,
          quantity: 1
        },
        {
          orderId: 1,
          itemId: 2,
          pizza:{
            pizzaId: 2,
            pizzaName: 'Srbijana',
            description: 'sunka kackavalj masline pecurke',
            price: 340
          },
          amount: 340,
          price: 340,
          quantity: 1
        }
      ],
      user: {
        userId: 1,
        fullName: 'Mladen Milic',
        password: 'mladja',
        username: 'mladja',
        role: 'manager'
      }
    },
    {
      orderId: 2,
      date: new Date('01-01-2020'),
      phoneNumber: '066449565',
      place:{
        zipCode: 11070,
        township: 'Novi Beograd'
      },
      street: 'Studenska 10',
      totalAmount: 1280,
      orderItems:[
        {
          orderId: 2,
          itemId: 1,
          pizza:{
            pizzaId: 1,
            pizzaName: 'Sicilijana',
            description: 'sunka kackavalj masline pecurke',
            price: 300
          },
          amount: 600,
          price: 300,
          quantity: 2
        },
        {
          orderId: 1,
          itemId: 2,
          pizza:{
            pizzaId: 2,
            pizzaName: 'Srbijana',
            description: 'sunka kackavalj masline pecurke',
            price: 340
          },
          amount: 680,
          price: 340,
          quantity: 2
        }
      ],
      user: {
        userId: 1,
        fullName: 'Mladen Milic',
        password: 'mladja',
        username: 'mladja',
        role: 'manager'
      }
    }
  ];

  constructor() { }

  public getListOrder() {
    return this.listOrder;
  }
  public getOrder(orderId): Order {
    return this.listOrder.find( i => i.orderId === orderId);
  }
  public addOrder(order: Order) {
    this.listOrder.push(order);
  }
  public filterByOrderId(orderId?: number): Order [] {
    if(orderId) {
      return this.listOrder.filter(i => i.orderId === orderId);
    }
    return this.getListOrder();
  }
  public filterByDate(dateFrom?: Date, dateTo?: Date): Order [] {
      if (!dateFrom && !dateTo){
        return this.listOrder;
      }
      if (!dateFrom && dateTo) {
        return this.listOrder.filter(i => i.date <= dateTo);
      }
      if(!dateTo && dateFrom) {
        this.listOrder.filter(i => i.date >= dateFrom);
      }
      return this.listOrder.filter(i => i.date >= dateFrom && i.date <= dateTo);
  }
  public deleteOrder(order: Order) {
    this.listOrder = this.listOrder.filter(i => i.orderId !== order.orderId);
  }
}
