import { PizzaComponents } from 'app/model/PizzaComponents';

export class Pizza {
  public pizzaId: number;
  public pizzaName: string;
  public pizzaComponents: PizzaComponents [] = [];
  public price: number;
}
