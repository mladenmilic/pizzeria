import { Router, ActivatedRoute } from '@angular/router';
import { Pizza } from 'app/model/Pizza';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user..service';
import { PizzaService } from 'app/services/pizza.service';
import { User } from 'app/model/user';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.css']
})
export class CreatePizzaComponent implements OnInit {
  public user: User;
  public createPizzaFormGroup: FormGroup;
  public pizzaId = 0;
  public id = 0;
  public title = 'Kreiranje ponude';
  public pizza: Pizza;
  constructor(
     protected userService: UserService,
     protected pizzaService: PizzaService,
     protected router: Router,
     protected route: ActivatedRoute,
      ) { }

  ngOnInit() {
    this.findUser();
    this.createPizzaFormGroup = new FormGroup({
      pizzaName: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required])
    });
    this.id = +this.route.snapshot.paramMap.get('id');
    if(this.id > 0) {
      this.populateAndChangeForm();
    }
  }

  public createPizza() {
    const pizza: Pizza = {
      pizzaId: this.pizzaId,
      pizzaName: this.createPizzaFormGroup.controls.pizzaName.value,
      description: this.createPizzaFormGroup.controls.description.value,
      price: this.createPizzaFormGroup.controls.price.value
    }
    this.pizzaService.createPizza(pizza).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/review-offers']);
    });
  }
  public populateAndChangeForm() {
    this.title = 'Promena ponude';
    this.pizzaService.getPizza(this.id).subscribe((res) => {
      this.pizza =  res;
      this.createPizzaFormGroup.controls.pizzaName.setValue(this.pizza.pizzaName);
      this.createPizzaFormGroup.controls.description.setValue(this.pizza.description);
      this.createPizzaFormGroup.controls.price.setValue(this.pizza.price);
    });
  }
  public updatePizza() {
    const pizza: Pizza = {
      pizzaId: this.id,
      pizzaName: this.createPizzaFormGroup.controls.pizzaName.value,
      description: this.createPizzaFormGroup.controls.description.value,
      price: this.createPizzaFormGroup.controls.price.value
    }
    this.pizzaService.updatePizza(pizza).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/review-offers']);
    });
  }
  private findUser() {
    this.user = jwt_decode(localStorage.getItem('token'));
  }
}
