import { ConfirmationDialogComponent } from './../dialog/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { UserService } from 'app/services/user..service';
import { User } from 'app/model/user';
import { Order } from 'app/model/Order';
import { MatTableDataSource, MatPaginator, MatTable, MatDialog } from '@angular/material';
import { OrderService } from 'app/services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe} from '@angular/common';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { ErrorDialogComponent } from '../dialog/error-dialog/error-dialog.component';
import { InformationDialogComponent } from '../dialog/information-dialog/information-dialog.component';
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
    protected route: Router,
    protected dialog: MatDialog
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
      if(res.length > 0) {
        this.listOrders = res;
      } else {
        this.dialog.open(ErrorDialogComponent, {data: {
          message: 'Nije pronađena nijedna porudžbina po zadatim datumima !'
        }, disableClose: true});
      }
      this.dataSource = new MatTableDataSource<any>(this.listOrders);
      this.dataSource.paginator = this.paginator;
    },
    (err) => {
      this.dialog.open(ErrorDialogComponent, {data: {
        message: err.error.message
      }, disableClose: true});
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
      console.log(err.error.message);
      this.dialog.open(ErrorDialogComponent, {data: {
        message: err.error.message
      }, disableClose: true});
    });
  }

  public overviewOrders(orderId: number) {
    this.route.navigate(['/overview-order/' + orderId]);
  }
  public editOrder(orderId: number) {
    this.route.navigate(['/new-order/' + orderId]);
  }
  public deleteOrder(order: Order) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {message: 'Da li ste sigurni da želite da izbrišete porudžbinu ?'},
      disableClose: true
    }).afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        const openDialog = this.dialog.open(InformationDialogComponent, {data:
          {message: 'Brisanje porudžbine...'},
           disableClose: true});
        this.orederService.deleteOrder(order).subscribe((result) => {
          console.log(result);
          this.initTable();
          openDialog.close();
        }
        , (error) => {
          this.dialog.open(ErrorDialogComponent,{data: {
            message: error.error.message
           },
           disableClose: true});        }
        );
      }
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
