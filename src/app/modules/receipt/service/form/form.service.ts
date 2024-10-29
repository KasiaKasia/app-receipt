import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formBuilder = inject(FormBuilder);

  createForm(): FormGroup {

    return this.formBuilder.group({
      shopName: ['', Validators.required],
      nip: ['', Validators.required],
      totalPrice: ['', Validators.required],
      dateOfPurchase: new FormControl(<Date[] | null>(null)),
      listProducts: this.formBuilder.array([this.createProduct()]),
      image: this.formBuilder.group({
        name: [''],
        base64: ['']
      })
    }, { updateOn: 'submit' });
  }

  createProduct(): FormGroup {
    const listProductsForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      totalPrice: ['', Validators.required]
    })
    return listProductsForm
  }
}
