import { Pizza } from './../model/Pizza';
import { Injectable } from '@angular/core';

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
}
