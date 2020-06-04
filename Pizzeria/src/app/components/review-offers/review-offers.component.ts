import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { User } from 'app/model/user';
import { Pizza } from 'app/model/Pizza';
import { MatPaginator, MatTableDataSource, MatTable, MatDialog } from '@angular/material';
import { UserService } from 'app/services/user..service';
import { PizzaService } from 'app/services/pizza.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { isNumber } from 'util';
import { ErrorDialogComponent } from '../dialog/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from '../dialog/information-dialog/information-dialog.component';
@Component({
  selector: 'app-review-offers',
  templateUrl: './review-offers.component.html',
  styleUrls: ['./review-offers.component.css']
})
export class ReviewOffersComponent implements OnInit {
  public pizzaFormGroup: FormGroup;
  public user: User;
  public displayedColumns: string[] = ['pizzaId', 'pizzaName', 'price', 'akcija'];
  public dataSource: any;
  public listPizza: Pizza [] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) public table: MatTable<any>;
  constructor(
     protected userService: UserService,
     protected pizzaService: PizzaService,
     protected route: Router,
     protected dialog: MatDialog
     ) { }

  ngOnInit() {
    this.findUser();
    this.initTable();
    this.pizzaFormGroup = new FormGroup({
      priceFrom: new FormControl(),
      priceTo: new FormControl()
    });
  }
  public filterByPrice() {
    const priceFrom = + (this.pizzaFormGroup.controls.priceFrom.value > 0) ?
    this.pizzaFormGroup.controls.priceFrom.value : '';
    const priceTo = + (this.pizzaFormGroup.controls.priceTo.value > 0) ?
    this.pizzaFormGroup.controls.priceTo.value : '' ;
    console.log(priceFrom, priceTo);
    this.pizzaService.filterByPrice(priceFrom, priceTo).subscribe((res) => {
      console.log(res);
      this.listPizza = new Array();
      if(res.length > 0) {
        this.listPizza = res;
      } else {
        this.dialog.open(ErrorDialogComponent, {data: {
          message: 'Nije pronađena nijedna ponuda po zadatim cenama !'
        }, disableClose: true});
      }
      this.dataSource = new MatTableDataSource<any>(this.listPizza);
      this.dataSource.paginator = this.paginator;
    },
    (err) => {
      this.dialog.open(ErrorDialogComponent, {data: {
        message: err.error.message
      }, disableClose: true});
    });
    this.pizzaFormGroup.controls.priceTo.setValue(null);
    this.pizzaFormGroup.controls.priceFrom.setValue(null);
  }
  public deletOffer(element: Pizza) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {message: 'Da li ste sigurni da želite da izbrišete ponudu ?'},
      disableClose: true
    }).afterClosed().subscribe((res) => {
      if (res) {
        const openDialog = this.dialog.open(InformationDialogComponent, {data:
          {message: 'Brisanje ponude...'},
           disableClose: true});
        this.pizzaService.deletePizza(element).subscribe((result) => {
          console.log(res);
          this.pizzaService.getListPizza().subscribe((list) => {
            this.dataSource.data = list;
            openDialog.close();
          });
        });
      }
    });
  }
  public back() {
    this.route.navigate(['/home']);
  }

  private initTable() {
    this.pizzaService.getListPizza().subscribe((res) => {
      this.listPizza = res;
      this.dataSource = new MatTableDataSource(this.listPizza);
      this.dataSource.paginator = this.paginator;
    });
  }
  private findUser() {
    this.user = jwt_decode(localStorage.getItem('token'));
  }
}
