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
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as jwt_decode from 'jwt-decode';
import { toUnicode } from 'punycode';

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
  public itemId = 0;
  public orderId = 0;
  public quantity = 1;
  public title = 'Kreiranje porudžbine';
  public id: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) public table: MatTable<any>;
  constructor(
    protected userService: UserService,
    protected placeService: PlaceService,
    protected pizzaService: PizzaService,
    protected oredrService: OrderService,
    protected route: Router,
    protected datePipe: DatePipe,
    protected router: ActivatedRoute
    ) {

  }

  ngOnInit() {
    this.findUser();
    this.dataSource =  new MatTableDataSource<any>(this.listOrderItems);
    this.dataSource.paginator = this.paginator;
    this.fillSelectField();
    // tslint:disable-next-line: no-bitwise
    //this.orderId = Math.random() * 1000000000 | 0;
    this.newOrderFormGroup = new FormGroup({
      street: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      pizza: new FormControl('', [Validators.required]),
      itemId: new FormControl('', [])
    });
    this.id = +this.router.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.changeAndPopulateForm();
    }
  }



  public createOrder() {
     const order = {
       orderId: this.orderId,
       date: new Date(),
       orderItems: this.listOrderItems,
       phoneNumber: this.newOrderFormGroup.controls.mobileNumber.value,
       //place: this.newOrderFormGroup.controls.place.value,
       street: this.newOrderFormGroup.controls.street.value,
       //user: this.user,
       totalAmount: this.totalAmout,
       userId: this.user.userId,
       placezipCode: (this.newOrderFormGroup.controls.place.value).zipCode
     }
     console.log(order);
     this.oredrService.addOrder(order).subscribe((res) => {
       console.log(res);
       this.route.navigate(['/list-orders']);
     });
  }
  public addPizza() {
    const quantity = this.quantity;
    const itemId = this.itemId;
    const pizza: Pizza = this.newOrderFormGroup.controls.pizza.value;
    const orderId = this.orderId;
    const orderItem: OrderItems = {
      itemId: 0,
      orderId,
      quantity,
      price: pizza.price,
      amount: quantity * pizza.price,
      pizzaName: pizza.pizzaName,
      pizzaId:pizza.pizzaId
    };
    if (this.listOrderItems.length > 0) {
      const a = this.listOrderItems.find((element) => {
        return element.pizzaId === pizza.pizzaId;
      });
      if (a) {
        this.listOrderItems.forEach((item) => {
          if (item.pizzaId === a.pizzaId) {
            item.quantity += 1;
            item.amount += pizza.price;
            this.totalAmout += pizza.price;
            return;
          }
        });
      } else {
         //++this.itemId;
         orderItem.itemId = 0;
         this.listOrderItems.push(orderItem);
         this.totalAmout += pizza.price;
      }
    } else {
       this.itemId = 0;
       orderItem.itemId  = this.itemId;
       this.listOrderItems.push(orderItem);
       this.totalAmout += orderItem.amount;
       this.dataSource = new MatTableDataSource<any>(this.listOrderItems);
       this.dataSource.paginator = this.paginator;
    }
    this.dataSource._updateChangeSubscription();
  }
  public deleteRow(element: OrderItems) {
    this.totalAmout -= element.amount;
    this.listOrderItems = this.listOrderItems.filter(i => i !== element);
    this.listOrderItems = this.fixListOrderItems(this.listOrderItems);
    this.dataSource =  new MatTableDataSource<any>(this.listOrderItems);
    this.dataSource.paginator = this.paginator;
    this.dataSource._updateChangeSubscription();
  }
  public updateOrder() {
    const order: Order = {
      orderId: this.id,
      date: new Date(),
      orderItems: this.listOrderItems,
      phoneNumber: this.newOrderFormGroup.controls.mobileNumber.value,
      place: this.newOrderFormGroup.controls.place.value,
      street: this.newOrderFormGroup.controls.street.value,
      user: this.user,
      totalAmount: this.totalAmout,
      userId: this.user.userId,
      placezipCode:(this.newOrderFormGroup.controls.place.value).zipCode
    }
    console.log(order);
    this.oredrService.updateOrder(order).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/list-orders']);
    });
  }
  private changeAndPopulateForm() {
    this.title = 'Izmena porudžbine';
    this.oredrService.getOrder(this.id).subscribe((res) => {
      const order: Order = res;
      this.totalAmout = order.totalAmount;
      this.listOrderItems = order.orderItems;
      this.dataSource = new MatTableDataSource<any>(this.listOrderItems);
      this.dataSource.paginator = this.paginator;
      this.newOrderFormGroup.controls.place.setValue(this.listPlace.find(i => i.zipCode === order.place.zipCode));
      this.newOrderFormGroup.controls.street.setValue(order.street);
      this.newOrderFormGroup.controls.mobileNumber.setValue(order.phoneNumber);
    });
  }
  private fixListOrderItems(listOrderItems: OrderItems []) {
   if(listOrderItems.length === 1) {
     listOrderItems[0].itemId = 1;
     this.itemId = 1;
     return listOrderItems;
   }
   if(!listOrderItems) {
     this.itemId = 1;
     return new Array ();
   }
   // tslint:disable-next-line:prefer-for-of
   for (let i = 0; i < listOrderItems.length; i++) {
    for (let j = 1; j < listOrderItems.length; j++) {
      if (( listOrderItems[j].itemId -  listOrderItems[i].itemId === 2) || (listOrderItems[i].itemId - listOrderItems[i].itemId === -2)) {
        if (listOrderItems[i].itemId === 1) {
          listOrderItems[j].itemId -= 1;
        } else {
          listOrderItems[i].itemId -= 1;
          listOrderItems[j].itemId -= 1;
          this.itemId = listOrderItems[j].itemId;
        }
      }
    }
   }
   return listOrderItems;
  }
  private fillSelectField() {
    this.placeService.getListPlace().subscribe((res) => {
      this.listPlace = res;
    });
    this.pizzaService.getListPizza().subscribe((res) => {
      this.listPizza = res;
    });
  }

  private findUser() {
    this.user = jwt_decode(localStorage.getItem('token'));
  }
}

