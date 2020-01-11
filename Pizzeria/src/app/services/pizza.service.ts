import { Pizza } from './../model/Pizza';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'minimatch';

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
  public updatePizza(pizza: Pizza) {
    this.listPizza.forEach((element) =>{
      if(element.pizzaId === pizza.pizzaId) {
        element.pizzaName = pizza.pizzaName;
        element.description = pizza.description;
        element.price = pizza.price;
        return;
      }
    })
  }
  public filterByPrice(priceFrom?: number, priceTo?: number): Pizza [] {
   const filterListPizza: Pizza [] = [];
   if (priceFrom && priceTo) {
     this.listPizza.forEach((el) => {
       if( el.price >= priceFrom || el.price <= priceTo) {
         filterListPizza.push(el);
       }
     });
   }
   if(!priceFrom && priceTo) {
    return this.listPizza.filter(i => i.price <= priceTo);
   }
   if(!priceTo && priceFrom) {
    return this.listPizza.filter(i => i.price >= priceFrom);
   }
   if(!priceFrom && !priceTo) {
     return this.getListPizza();
   }
   return filterListPizza;
  }
}
