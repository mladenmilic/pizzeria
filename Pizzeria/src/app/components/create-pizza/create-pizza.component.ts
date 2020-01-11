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
  constructor(protected userService: UserService, protected pizzaService: PizzaService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.createPizzaFormGroup = new FormGroup({
      pizzaName: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required])
    });
  }

}
