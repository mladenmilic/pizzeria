import { PizzaComponents } from 'app/model/PizzaComponents';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user..service';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from 'app/model/Pizza';
import { PizzaService } from 'app/services/pizza.service';
import * as jwt_decode from 'jwt-decode';
import { MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-overview-pizza',
  templateUrl: './overview-pizza.component.html',
  styleUrls: ['./overview-pizza.component.scss']
})
export class OverviewPizzaComponent implements OnInit {
 public user: User;
  public pizza: Pizza;
  public dataSource: any = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['redniBroj', 'imeSastojka', 'kolicina'];
  public overviewPizzaFormGroup: FormGroup = new FormGroup({});
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) public table: MatTable<any>;
  constructor(
    protected userService: UserService,
    protected route: ActivatedRoute,
    protected pizzaService: PizzaService
  ) { }

  ngOnInit() {
    this.overviewPizzaFormGroup = new FormGroup({
      pizzaName: new FormControl('', []),
      price: new FormControl('',[]),
    });
    this.findUser();
    this.populateForm();
  }

  private populateForm() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pizzaService.getPizza(id).subscribe((res) => {
      this.pizza = res;
      this.overviewPizzaFormGroup.controls.pizzaName.setValue(this.pizza.pizzaName);
      this.overviewPizzaFormGroup.controls.price.setValue(this.pizza.price);
      this.dataSource =  new MatTableDataSource<any>(this.pizza.pizzaComponents);
      this.dataSource.paginator = this.paginator;
    });
  }
  private findUser() {
    this.user = jwt_decode(localStorage.getItem('token'));
  }
}
