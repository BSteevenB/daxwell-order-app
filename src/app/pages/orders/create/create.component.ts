import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  orderForm!: FormGroup;
  statuses = ['Pending', 'Approved', 'Shipped', 'Cancelled'];
  locations = ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Warehouse D'];
  incoterms = ['EXW', 'FOB', 'CIF', 'DDP', 'DAP'];
  freightTerms = ['Prepaid', 'Collect'];
  pendingReasons = ['PRICE_DISCREPANCY', 'CREDIT_HOLD', 'STOCK_SHORTAGE', 'CUSTOMER_REQUEST'];
  @Input() readonly: boolean = false;
  @Input() orderData: any;
  constructor(private fb: FormBuilder, private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      orderNumber: ['', Validators.required],
      customer: ['', Validators.required],
      transactionDate: ['', Validators.required],
      status: ['', Validators.required],
      fromLocation: ['', Validators.required],
      toLocation: ['', Validators.required],
      pendingApprovalReasonCode: [[]],
      supportRep: [''],
      incoterm: [''],
      freightTerms: [''],
      totalShipUnitCount: [null],
      totalQuantity: [null],
      discountRate: [null],
      billingAddress: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        postalCode: [''],
        country: ['']
      }),
      shippingAddress: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        postalCode: [''],
        country: ['']
      }),
      earlyPickupDate: [''],
      latePickupDate: [''],
      lines: this.fb.array([
        this.createLineGroup()
      ])
    }, { validators: this.validateEitherIncotermOrFreightTerms.bind(this) });

    // Conditional incoterm/freightTerm logic
    this.orderForm.get('incoterm')?.valueChanges.subscribe(val => {
      console.log(this.orderForm, 'order')
      if (val) this.orderForm.get('freightTerms')?.reset();
    });

    this.orderForm.get('freightTerms')?.valueChanges.subscribe(val => {
      if (val) this.orderForm.get('incoterm')?.reset();
    });

    if (this.readonly) {
      this.orderForm.disable();  // disable entire form
    }
    if (this.orderData) {
      this.orderForm.patchValue(this.orderData);
    }
  }

createLineGroup(): FormGroup {
  return this.fb.group({
    item: ['', Validators.required],
    units: [''],
    quantity: [0, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0)]],
    amount: [{ value: 0, disabled: true }]
  });
}

validateEitherIncotermOrFreightTerms(group: AbstractControl): ValidationErrors | null {
  const incoterm = group.get('incoterm')?.value;
  const freightTerms = group.get('freightTerms')?.value;

  // If neither is filled → error
  if (!incoterm && !freightTerms) {
    return { eitherRequired: true };
  }
  // Valid
  return null;
}

  get lines(): FormArray {
    return this.orderForm.get('lines') as FormArray;
  }

  addLine() {
    this.lines.push(this.fb.group({
      item: [''],
      units: [''],
      quantity: [null],
      price: [null],
      amount: [{ value: 0, disabled: true }]
    }));
  }

  removeLine(index: number) {
    this.lines.removeAt(index);
  }

  calculateLineAmount(index: number) {
    const line = this.lines.at(index);
    const qty = line.get('quantity')?.value || 0;
    const price = line.get('price')?.value || 0;
    line.get('amount')?.setValue(qty * price);
  }

  onSubmit() {
  this.orderForm.markAllAsTouched();
  if (this.orderForm.invalid) return;

  const newOrder = this.orderForm.getRawValue(); 

  this.orderService.addOrder(newOrder); 

  this.router.navigate(['/orders/list']);
  }
}
