import { Place } from './Place';
import { User } from './user';
import { OrderItems } from './orderItems';

export class Order {
  public orderId: number;
  public date: Date;
  public totalAmount: number;
  public street: string;
  public place: Place;
  public phoneNumber: string;
  public user: User;
  public orderItems: [OrderItems];
}
