import { Pizza } from './../model/Pizza';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  public listPizza: Pizza [] =
  [
    {
      pizzaId: 1,
      pizzaName: 'Sicilijana',
      description: 'sunka kackavalj masline pecurke',
      price: 300,
    },
    {
      pizzaId: 2,
      pizzaName: 'Srbijana',
      description: 'sunka kackavalj masline pecurke',
      price: 340,
    },
    {
      pizzaId: 3,
      pizzaName: 'Mexicana',
      description: 'sunka kackavalj masline pecurke',
      price: 400,
    },
    {
      pizzaId: 4,
      pizzaName: 'Zabac',
      description: 'sunka kackavalj masline pecurke',
      price: 390,
    }
  ]
  constructor(){ }

  public getListPizza(): Pizza [] {
    return this.listPizza;
  }
  public deletePizza(pizza: Pizza) {
    this.listPizza = this.listPizza.filter(i => i !== pizza);
  }
  public createPizza(pizza: Pizza) {
    this.listPizza.push(pizza);
  }
  public getPizza(piazzaId: number): Pizza {
    return this.listPizza.filter(i => i.pizzaId === piazzaId)[0];
  }
}
