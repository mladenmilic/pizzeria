import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { User } from 'app/model/user';
import { Pizza } from 'app/model/Pizza';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';
import { UserService } from 'app/services/user..service';
import { PizzaService } from 'app/services/pizza.service';
import { Router } from '@angular/router';

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
     protected route: Router
     ) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.initTable();
    this.pizzaFormGroup = new FormGroup({
      priceFrom: new FormControl(),
      priceTo: new FormControl()
    });
  }
  public filterByPrice() {
    const priceFrom = +this.pizzaFormGroup.controls.priceFrom.value;
    const priceTo = +this.pizzaFormGroup.controls.priceTo.value;
    console.log(priceFrom, priceTo);
    this.dataSource.data = this.pizzaService.filterByPrice(priceFrom, priceTo);
  }
  public deletOffer(element: Pizza) {
    this.pizzaService.deletePizza(element).subscribe((res) => {
      console.log(res);
      this.pizzaService.getListPizza().subscribe((res) => {
        this.dataSource.data = res;
      });
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
}
