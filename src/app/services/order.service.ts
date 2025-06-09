import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = new BehaviorSubject<any[]>([]);
  orders$ = this.orders.asObservable();

  constructor(private http: HttpClient) {
    // simulate loading from JSON file
    const initialOrders = [
      { id: 1, customer: 'ABC', status: 'Pending' },
      { id: 2, customer: 'XYZ', status: 'Approved' }
    ];
     this.http.get<any[]>('../assets/orders.json').subscribe(data => {
      this.orders.next(data);
      console.log(data, 'data')
    });
   // this.orders.next(initialOrders);
  }

  getOrderCount(): number {
    return this.orders.getValue().length;
  }

  addOrder(order: any) {
    const current = this.orders.getValue();
    this.orders.next([...current, order]);
  } 
  
  getOrderById(orderNumber: any): Observable<any | undefined>{
    return this.orders$.pipe(
      map((orders) => {
        return orders.find(order => order.orderNumber === orderNumber)
      })
    )
  }



  setOrders(newOrders: any[]): void {
    this.orders.next(newOrders);
  }
}
