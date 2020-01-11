import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'app/model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Place } from 'app/model/Place';
import { Pizza } from 'app/model/Pizza';
import { OrderItems } from 'app/model/orderItems';
import { MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { UserService } from 'app/services/user..service';
import { PlaceService } from 'app/services/place.service';
import { PizzaService } from 'app/services/pizza.service';
import { OrderService } from 'app/services/order.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-overview-order',
  templateUrl: './overview-order.component.html',
  styleUrls: ['./overview-order.component.css']
})
export class OverviewOrderComponent implements OnInit {

  public user: User;
  public newOrderFormGroup: FormGroup;
  public displayedColumns: string[] = ['redniBroj', 'nazivPice', 'kolicina', 'cena', 'iznos'];
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
    protected route: Router,
    protected datePipe: DatePipe
    ) {

  }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.dataSource =  new MatTableDataSource<any>(this.listOrderItems);
    this.dataSource.paginator = this.paginator;
    this.newOrderFormGroup = new FormGroup({
      street: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      pizza: new FormControl('', [Validators.required]),
      itemId: new FormControl('', [])
    });
  }

}
