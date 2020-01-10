import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'app/services/user..service';
import { User } from 'app/model/user';
import { Order } from 'app/model/Order';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { OrderService } from 'app/services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  public user: User;
  public displayedColumns: string[] = ['sifra', 'datum', 'iznos', 'akcija'];
  public dataSource: any;
  public listOrders: Order [] = new Array();
  public newOrderFormGroup: FormGroup;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    protected userService: UserService,
    protected orederService: OrderService
    ) { }

  ngOnInit() {
    this.listOrders = this.orederService.getListOrder();
    this.user =  this.userService.currentUser;
    this.dataSource = new MatTableDataSource<any>(this.listOrders);
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
