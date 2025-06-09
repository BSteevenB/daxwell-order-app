import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  orders: any[] = [];
  filteredOrders = new MatTableDataSource<any>([]);
  columns: string[] = [  'orderNumber',
  'customer',
  'transactionDate',
  'dueDate',
  'amount',
  'status',
  'actions'];
  selectedTabIndex = 0;

  statusOptions = ['Pending', 'Approved', 'Shipped', 'Cancelled'];

@ViewChild(MatSort) sort!: MatSort;
startDate?: Date;
endDate?: Date;
selectedReasons: string[] = [];

reasonCodes: string[] = [
  'PRICE_DISCREPANCY',
  'CREDIT_HOLD',
  'STOCK_SHORTAGE',
  'CUSTOMER_REQUEST',
];
  isMobile = false;



  constructor(private orderService: OrderService, private router: Router) {}

  
  ngOnInit(): void {
    this.orderService.orders$.subscribe(data => {
      this.orders = data;
      this.applyFilterByTab(); // auto filter when data updates
    });
     this.checkScreen();
  window.addEventListener('resize', () => this.checkScreen());
  }



checkScreen(): void {
  this.isMobile = window.innerWidth < 768;
}

  ngAfterViewInit(): void {
    this.filteredOrders.sort = this.sort;
    console.log(this.filteredOrders, 'filteredOrders')
  }

  filterByStatus(event: any): void {
    this.selectedTabIndex = event.index;
    this.applyFilterByTab();
  }

  applyFilterByTab(): void {
  const label = ['All', ...this.statusOptions][this.selectedTabIndex];

  this.filteredOrders.data = this.orders.filter(order => {
  const txDate = this.toLocalDate(order.transactionDate);
const start = this.startDate ? this.toLocalDate(this.startDate) : null;
const end = this.endDate ? this.toLocalDate(this.endDate) : null;

    const matchesTab = label === 'All' || order.status === label;
    const matchesStart = !start || (txDate && txDate.getTime() >= start.getTime());
    const matchesEnd = !end || (txDate && txDate.getTime() <= end.getTime());
    const matchesReasons =
      this.selectedReasons.length === 0 ||
      (order.pendingApprovalReasonCode ?? []).some((code: string) =>
        this.selectedReasons.includes(code)
      );

    return matchesTab && matchesStart && matchesEnd && matchesReasons;
  });
}


toLocalDate(date: string | Date | null): Date | null {
  if (!date) return null;

  if (typeof date === 'string') {
    // Expecting format: 'YYYY-MM-DD'
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day); // JS months are 0-based
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}






  getOrderAmount(order: any): number {
    return order.lines?.reduce((sum: number, line: any) => sum + (line.amount || 0), 0);
  }

  viewOrder(order: any) {
    console.log(order, 'order')
    this.router.navigate(['/orders', order.orderNumber, 'view']);
  }

  getStatusCount(status: string): number {
  return this.filteredOrders.data.filter(order => order.status === status).length;
}

applyFilters(): void {
  this.applyFilterByTab(); // reuse the logic with current tab
}


  deleteOrder(order: any): void {
    const confirmDelete = confirm(`Are you sure you want to delete order #${order.orderNumber}?`);
    if (confirmDelete) {
      const updatedOrders = this.orders.filter(o => o !== order);
      this.orderService.setOrders(updatedOrders); // you define this method in service
    }
  }
}
