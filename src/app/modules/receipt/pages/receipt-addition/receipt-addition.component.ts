import { AfterViewChecked, Component, OnDestroy, Pipe, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReceiptService } from '../../service/receipt/receipt.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarAnnotatedComponent } from 'src/app/shared/components/snack-bar/snack-bar-annotated/snack-bar-annotated.component';
import { User } from 'src/app/shared/models/interface-user';
import * as _moment from 'moment';
import { Subscription, forkJoin } from 'rxjs';
import { FileUploadComponent } from 'src/app/modules/components/file-upload/file-upload.component';
import { DashboardHeadingComponent } from 'src/app/shared/components/dashboard-heading/dashboard-heading.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NipFormatPipe } from '../../pipe/nip-format.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
const moment = _moment;
 
@Component({
  selector: 'app-receipt-addition',
  standalone: true,
  imports: [ CommonModule, NipFormatPipe, MatProgressBarModule,ReactiveFormsModule,FileUploadComponent,DashboardHeadingComponent, MatButtonModule,MatInputModule,MatDatepickerModule,],
  templateUrl: './receipt-addition.component.html',
  styleUrls: ['./receipt-addition.component.scss']
})
export class ReceiptAdditionComponent implements OnDestroy, AfterViewChecked {
  readonly subscriptions$ = new Subscription()
  title = 'Dodaj paragon';
  @ViewChild(FileUploadComponent)
  base64Ref!: FileUploadComponent;
  userId: User = {};
  addReceiptForm: FormGroup = this.fb.group({
    shopName: [''],
    nip: [''],
    totalPrice: [''],
    dateOfPurchase: null,
    listProducts: this.fb.array([this.createProduct()]),
    image: this.fb.group({
      name: [''],
      base64: ['']
    })
  }, { updateOn: 'submit' });

  get listProducts() {
    return this.addReceiptForm.get('listProducts') as FormArray;
  }

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private receiptService: ReceiptService,
    private activateRouter: ActivatedRoute) {}

  ngAfterViewChecked(): void {
    this.addReceiptForm.controls['image'].get('name')?.setValue(this.base64Ref.imageName)
    this.addReceiptForm.controls['image'].get('base64')?.setValue(this.base64Ref.base64)
  }
  ngOnDestroy() {
    this.subscriptions$.unsubscribe()
  }
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
      totalPrice: ['']
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
      let dateOfPurchase = moment(this.addReceiptForm.get('dateOfPurchase')?.value).format('YYYY.MM.DD');
      this.addReceiptForm.controls['dateOfPurchase'].setValue(dateOfPurchase)
      this.subscriptions$.add(this.activateRouter.params.subscribe(params => this.userId = params['id']))


      this.addReceiptForm.value.listProducts.length = this.addReceiptForm.value.listProducts.length
      let receiptFormValue = {
        ...this.addReceiptForm.getRawValue(),
        numberOfAddedProducts: this.addReceiptForm.value.listProducts.length
      }

      this.subscriptions$.add(forkJoin({
        requestImage: this.receiptService.addReceiptImage(receiptFormValue, this.userId),
        requestReceipt: this.receiptService.addReceipt(receiptFormValue, this.userId)
      })
        .subscribe(req => {
          this.openSnackBar('Paragon oraz obraz został dodany do bazy danych')
        }))
    }
  }

  addProduct() {
    this.listProducts.push(this.createProduct())
  }
  removeProduct(index: number) {
    this.listProducts.removeAt(index);
  }
}
