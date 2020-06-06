import { Pizza } from './../model/Pizza';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'minimatch';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
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
  public filterByPrice(priceFrom?: string, priceTo?: string): Observable <any> {
   return this.http.get('https://localhost:44329/pizza/filter/?priceFrom=' + priceFrom + '&priceTo=' + priceTo);
  }
}
