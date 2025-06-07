import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = new BehaviorSubject<any[]>([]);
  orders$ = this.orders.asObservable();

  constructor() {
    // simulate loading from JSON file
    const initialOrders = [
      { id: 1, customer: 'ABC', status: 'Pending' },
      { id: 2, customer: 'XYZ', status: 'Approved' }
    ];
    this.orders.next(initialOrders);
  }

  getOrderCount(): number {
    return this.orders.getValue().length;
  }

  addOrder(order: any) {
    const current = this.orders.getValue();
    this.orders.next([...current, order]);
  }
}
