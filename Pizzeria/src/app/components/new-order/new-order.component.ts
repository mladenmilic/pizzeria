import { UserService } from 'app/services/user..service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'app/model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { PlaceService } from 'app/services/place.service';
import { PizzaService } from 'app/services/pizza.service';
import { Place } from 'app/model/Place';
import { Pizza } from 'app/model/Pizza';
import { OrderItems } from 'app/model/orderItems';
import { Order } from 'app/model/Order';
import { OrderService } from 'app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  public user: User;
  public newOrderFormGroup: FormGroup;
  public displayedColumns: string[] = ['redniBroj', 'nazivPice', 'kolicina', 'cena', 'iznos', 'akcija'];
  public dataSource: any;
  public listPlace: Place [];
  public listPizza: Pizza [];
  public listOrderItems: OrderItems [] = new Array();
  public totalAmout = 0;
  public itemId: number;
  public orderId: number;
  public quantity = 1;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) public table: MatTable<any>;
  constructor(
    protected userService: UserService,
    protected placeService: PlaceService,
    protected pizzaService: PizzaService,
    protected oredrService: OrderService,
    protected route: Router
    ) {

  }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.dataSource =  new MatTableDataSource<any>(this.listOrderItems);
    this.dataSource.paginator = this.paginator;
    this.listPlace = this.placeService.getListPlace();
    this.listPizza = this.pizzaService.getListPizza();
    // tslint:disable-next-line: no-bitwise
    this.orderId = Math.random() * 1000000000 | 0;
    this.newOrderFormGroup = new FormGroup({
      street: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      pizza: new FormControl('', [Validators.required]),
      itemId: new FormControl('', [])
    });
  }



  public createOrder() {
     const order: Order = {
       orderId: this.orderId,
       date: new Date(),
       orderItems: this.listOrderItems,
       phoneNumber: this.newOrderFormGroup.controls.mobileNumber.value,
       place: this.newOrderFormGroup.controls.place.value,
       street: this.newOrderFormGroup.controls.street.value,
       user: this.user,
       totalAmount: this.totalAmout
     }
     this.oredrService.addOrder(order);
     this.route.navigate(['/list-orders']);
  }
  public addPizza() {
    const quantity = this.quantity;
    const itemId = this.newOrderFormGroup.controls.itemId.value;
    const pizza: Pizza = this.newOrderFormGroup.controls.pizza.value;
    const orderId = this.orderId;
    const orderItem: OrderItems = {
      itemId,
      orderId,
      quantity,
      price: pizza.price,
      amount: quantity * pizza.price,
      pizza
    };
    if (this.listOrderItems.length > 0) {
      const a = this.listOrderItems.find((element) => {
        return element.pizza.pizzaId === pizza.pizzaId;
      });
      if (a) {
        this.listOrderItems.forEach((item) => {
          if (item.pizza.pizzaId === a.pizza.pizzaId) {
            item.quantity += 1;
            item.amount += pizza.price;
            this.totalAmout += pizza.price;
          }
        });
      } else {
         orderItem.itemId = this.newOrderFormGroup.controls.itemId.value;
         this.listOrderItems.push(orderItem);
         this.totalAmout += pizza.price;
      }
    } else {
      this.listOrderItems.push(orderItem);
      this.totalAmout += orderItem.amount;
    }
    this.dataSource._updateChangeSubscription();
  }
  public deleteRow(element: OrderItems) {
    this.totalAmout -= element.pizza.price;
    this.listOrderItems = this.listOrderItems.filter(i => i !== element);
    this.dataSource =  new MatTableDataSource<any>(this.listOrderItems);
    this.dataSource._updateChangeSubscription();
  }
}

