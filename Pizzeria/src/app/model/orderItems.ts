import { Order } from './Order';
import { Pizza } from './Pizza';

export class OrderItems {
  public itemId: number;
  public order: Order;
  public quantity: number;
  public price: number;
  public amount: number;
  public pizza: Pizza;
}
