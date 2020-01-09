import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'app/services/user..service';
import { User } from 'app/model/user';
import { Order } from 'app/model/Order';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  public user: User;
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource = new MatTableDataSource<Order>();
  public listOrders: [Order];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(protected userService: UserService) { }

  ngOnInit() {
    this.user =  this.userService.currentUser;
    this.dataSource.paginator = this.paginator;
  }

}
