import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  orderForm!: FormGroup;
  order: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderNumber = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderById(orderNumber).subscribe(order => {
      if(order) {
        this.order = order;
      }
    }) 

    this.orderForm = this.fb.group({
      
    });

    this.orderForm.patchValue(this.order);
    this.orderForm.disable(); 
  }
}
