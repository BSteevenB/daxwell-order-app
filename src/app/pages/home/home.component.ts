import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  orderCount = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.orders$.subscribe((orders) => {
      this.orderCount = orders.length;
    });
  }
}
