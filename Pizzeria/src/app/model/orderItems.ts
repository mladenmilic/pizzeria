import { Order } from './Order';
import { Pizza } from './Pizza';

export class OrderItems {
  public itemId: number;
  public orderId: number;
  public quantity: number;
  public price: number;
  public amount: number;
  public pizzaName: string;
  public pizzaId: number;
}
