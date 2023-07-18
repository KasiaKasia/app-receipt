import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-receipt-addition',
  templateUrl: './receipt-addition.component.html',
  styleUrls: ['./receipt-addition.component.scss']
})
export class ReceiptAdditionComponent {
  addReceiptForm: FormGroup = this.fb.group({
    shopName: [''],
    nip: [''],
    totalPrice: [''],
    dateOfPurchase: [''],
    listProducts: this.fb.array([this.createProduct()])
  });
  get listProducts() {
    return this.addReceiptForm.get('listProducts') as FormArray;
  }
  constructor(private fb: FormBuilder) { }

  createProduct(): FormGroup {
    const listProductsForm = this.fb.group({
      productName: [''],
      quantity: [''],
      price: [''],
      totalPrice: [''],
    })
    return listProductsForm
  }

  groups = [{
    shopName: this.addReceiptForm.controls['shopName'].value,
    nip: this.addReceiptForm.controls['nip'].value,
    totalPrice: this.addReceiptForm.controls['totalPrice'].value,
    dateOfPurchase: this.addReceiptForm.controls['dateOfPurchase'].value,
    listProducts: this.addReceiptForm.controls['listProducts'].value
  }]

  save() {
    if (this.addReceiptForm.invalid) {
      return;
    }
    if (this.addReceiptForm.dirty && this.addReceiptForm.valid) {
    }
  }

  addProduct() {
    this.listProducts.push(this.createProduct())
  }
  removeProduct(index: number){
    this.listProducts.removeAt(index);
  }
}
