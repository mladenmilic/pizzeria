import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user..service';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from 'app/model/Pizza';
import { PizzaService } from 'app/services/pizza.service';

@Component({
  selector: 'app-overview-pizza',
  templateUrl: './overview-pizza.component.html',
  styleUrls: ['./overview-pizza.component.css']
})
export class OverviewPizzaComponent implements OnInit {
 public user: User;
  public pizza: Pizza;
  constructor(
    protected userService: UserService,
    protected route: ActivatedRoute,
    protected pizzaService: PizzaService
  ) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.populateForm();
  }

  private populateForm() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pizzaService.getPizza(id).subscribe((res) => {
      this.pizza = res;
    });
  }

}
