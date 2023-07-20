import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ReceiptService } from '../../service/receipt/receipt.service';
import * as _moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarAnnotatedComponent } from 'src/app/shared/components/snack-bar/snack-bar-annotated/snack-bar-annotated.component';
const moment = _moment;

@Component({
  selector: 'app-receipt-addition',
  templateUrl: './receipt-addition.component.html',
  styleUrls: ['./receipt-addition.component.scss']
})
export class ReceiptAdditionComponent {
  userId: string = ''
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
  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private receiptService: ReceiptService,
    private activateRouter: ActivatedRoute) { }
  openSnackBar(word: string) {
    this._snackBar.openFromComponent(SnackBarAnnotatedComponent, {
      duration: 5000,
      data: word
    });
  }
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

  onSubmit() {

    if (this.addReceiptForm.invalid) {
      return;
    }

    if (this.addReceiptForm.dirty && this.addReceiptForm.valid) {

      this.activateRouter.params.subscribe(params => this.userId = params['id'])
      let dateOfPurchase = moment(this.addReceiptForm.get('dateOfPurchase')?.value).format('YYYY.MM.DD');
      this.addReceiptForm.controls['dateOfPurchase'].setValue(dateOfPurchase)

      this.receiptService.addReceipt(this.addReceiptForm.getRawValue(), this.userId).subscribe(req => {
        this.openSnackBar('Paragon został dodany ')
      })
    }
  }

  addProduct() {
    this.listProducts.push(this.createProduct())
  }
  removeProduct(index: number) {
    this.listProducts.removeAt(index);
  }
}
