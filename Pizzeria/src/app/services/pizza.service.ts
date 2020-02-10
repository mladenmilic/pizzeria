import { Pizza } from './../model/Pizza';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'minimatch';
import { HttpClient } from '@angular/common/http';

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
  public constructor(
    protected http: HttpClient
  ){ }

  public getListPizza(): Observable <any> {
    return this.http.get('https://localhost:44329/pizza/list-pizza');
  }
  public deletePizza(pizza: Pizza): Observable<any> {
    return this.http.delete('https://localhost:44329/pizza/delete/' + pizza.pizzaId);
  }
  public createPizza(pizza: Pizza): Observable <any> {
    return this.http.post('https://localhost:44329/pizza/add-pizza', pizza);
  }
  public getPizza(piazzaId: number): Observable<any> {
    return this.http.get('https://localhost:44329/pizza/list-pizza/' + piazzaId);
  }
  public updatePizza(pizza: Pizza): Observable<any> {
    return this.http.put('https://localhost:44329/pizza/update', pizza);
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
     //return this.getListPizza();
   }
   return filterListPizza;
  }
}
