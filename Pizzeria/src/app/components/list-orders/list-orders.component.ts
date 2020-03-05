import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { UserService } from 'app/services/user..service';
import { User } from 'app/model/user';
import { Order } from 'app/model/Order';
import { MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { OrderService } from 'app/services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit , AfterViewInit{
  public user: User;
  public displayedColumns: string[] = ['sifra', 'datum', 'iznos', 'akcija'];
  public dataSource: any;
  public listOrders: Order [] = []
  public newOrderFormGroup: FormGroup;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) public table: MatTable<any>;
  constructor(
    protected userService: UserService,
    protected orederService: OrderService,
    protected datePipe: DatePipe,
    protected route: Router
    ) { }

  ngOnInit() {
    this.findUser();
    this.newOrderFormGroup = new FormGroup({
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
      orderId: new FormControl()
    });
  }
  ngAfterViewInit(): void {
    this.initTable();
  }

  public filterByDate() {
    const dateFrom: string =
    moment.isDate(this.newOrderFormGroup.controls.dateFrom.value) ?
     moment(this.newOrderFormGroup.controls.dateFrom.value).format('YYYY-MM-DD') : '';
    const dateTo: string =
     moment.isDate(this.newOrderFormGroup.controls.dateTo.value) ?
     moment(this.newOrderFormGroup.controls.dateTo.value).format('YYYY-MM-DD') : '';
    console.log(dateFrom, dateTo);
    this.orederService.filterByDate(dateFrom, dateTo).subscribe((res) =>{
      console.log(res);
      this.listOrders = new Array();
      if(res.length > 0) {
        this.listOrders = res;
      } else {
        this.listOrders.push(res);
      }
      this.dataSource = new MatTableDataSource<any>(this.listOrders);
      this.dataSource.paginator = this.paginator;
    },
    (err) => {
      console.log(err);
    });
    this.newOrderFormGroup.controls.dateTo.setValue(null);
    this.newOrderFormGroup.controls.dateFrom.setValue(null);
  }
  public filterByOrderId() {
    const orderId = +this.newOrderFormGroup.controls.orderId.value;
    this.orederService.filterByOrderId(orderId).subscribe((res) => {
      console.log(res);
      this.listOrders = new Array();
      if(res.length > 1) {
        this.listOrders = res;
      } else {
        this.listOrders.push(res);
      }
      this.dataSource = new MatTableDataSource<any>(this.listOrders);
      this.dataSource.paginator = this.paginator;
    },
    (err) => {
      console.log(err);
    });
  }

  public overviewOrders(orderId: number) {
    this.route.navigate(['/overview-order/' + orderId]);
  }
  public editOrder(orderId: number) {
    this.route.navigate(['/new-order/' + orderId]);
  }
  public deleteOrder(order: Order) {
    this.orederService.deleteOrder(order).subscribe((res) => {
      console.log(res);
      this.initTable();
    }
    ,(error) => {
      console.log(error);
    }
    );
  }
  private initTable() {
    this.orederService.getListOrder().subscribe((res) => {
      this.listOrders = res;
      this.dataSource = new MatTableDataSource<any>(this.listOrders);
      this.dataSource.paginator = this.paginator;
    });
  }
  private findUser() {
    this.user = jwt_decode(localStorage.getItem('token'));
  }
}
