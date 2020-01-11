import { Router } from '@angular/router';
import { Pizza } from 'app/model/Pizza';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user..service';
import { PizzaService } from 'app/services/pizza.service';
import { User } from 'app/model/user';

@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.css']
})
export class CreatePizzaComponent implements OnInit {
  public user: User;
  public createPizzaFormGroup: FormGroup;
  public pizzaId: number;
  constructor(protected userService: UserService, protected pizzaService: PizzaService, protected router: Router) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.createPizzaFormGroup = new FormGroup({
      pizzaName: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required])
    });
    this.pizzaId = Math.random() * 1000000000 | 0;
  }

  public createPizza() {
    const pizza: Pizza = {
      pizzaId: this.pizzaId,
      pizzaName: this.createPizzaFormGroup.controls.pizzaName.value,
      description: this.createPizzaFormGroup.controls.description.value,
      price: this.createPizzaFormGroup.controls.price.value
    }
    this.pizzaService.createPizza(pizza);
    this.router.navigate(['/review-offers']);
  }
}
