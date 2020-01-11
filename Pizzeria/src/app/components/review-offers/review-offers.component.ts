import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'app/model/user';
import { Pizza } from 'app/model/Pizza';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from 'app/services/user..service';
import { PizzaService } from 'app/services/pizza.service';

@Component({
  selector: 'app-review-offers',
  templateUrl: './review-offers.component.html',
  styleUrls: ['./review-offers.component.css']
})
export class ReviewOffersComponent implements OnInit {
  public pizzaFormGroup: FormGroup;
  public user: User;
  public displayedColumns: string[] = ['sifra', 'datum', 'iznos', 'akcija'];
  public dataSource: any;
  public listPizza: Pizza [] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(protected userService: UserService, protected pizzaService: PizzaService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.listPizza = this.pizzaService.getListPizza();
    this.dataSource = new MatTableDataSource(this.listPizza);
    this.dataSource.paginator = this.paginator;
    this.pizzaFormGroup = new FormGroup({
      priceFrom: new FormControl(),
      priceTo: new FormControl()
    });
  }
  public filterByPrice() {}
}
