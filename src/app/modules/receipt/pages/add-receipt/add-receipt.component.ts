import { AfterViewChecked, Component, input, OnDestroy, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NgIf } from '@angular/common';
import { ValidatorCharacterIsNumberDirective } from 'src/app/shared/validator-directive/validator-character-is-number.directive';
import { CharactersSignalsService } from '../../service/characters/characters-signals.service';
import { LoggerService } from 'src/app/shared/logger/logger.service';
import { ImportsModuleAddRecipt } from 'src/app/modules/imports-module/imports-modile-add-receipt';
const moment = _moment;

@Component({
  selector: 'app-add-receipt',
  standalone: true,
  imports: [ImportsModuleAddRecipt],
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.scss']
})
export class AddReceiptComponent implements OnDestroy, AfterViewChecked {
  readonly subscriptions$ = new Subscription()
  protected readonly title = input<string>('Dodaj paragon');

  @ViewChild(FileUploadComponent)
  base64Ref!: FileUploadComponent;
  userId: User = {};
  protected addReceiptForm: FormGroup = this.formBuilder.group({
    shopName: ['', Validators.required],
    nip: ['', Validators.required],
    totalPrice: ['', Validators.required],
    dateOfPurchase: new FormControl(<Date[] | null>(null)),
    listProducts: this.formBuilder.array([this.createProduct()]),
    image: this.formBuilder.group({
      name: [''],
      base64: ['']
    })
  }, { updateOn: 'change' || 'blur' || 'submit' });

  get listProducts() {
    return this.addReceiptForm.get('listProducts') as FormArray;
  }

  constructor(private logger: LoggerService,
    public formBuilder: FormBuilder,
    private charactersSignalsService: CharactersSignalsService,
    private _snackBar: MatSnackBar,
    private receiptService: ReceiptService,
    private activateRouter: ActivatedRoute) { }

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
    const listProductsForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      totalPrice: ['', Validators.required]
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
    this.addReceiptForm.controls['shopName'].markAsTouched();
    this.addReceiptForm.controls['nip'].markAsTouched();
    this.addReceiptForm.controls['totalPrice'].markAsTouched();
    this.listProducts.controls.forEach(control => control.markAsTouched());

    if (this.addReceiptForm.invalid) { return };
    if (this.addReceiptForm.valid) {

      const dateOfPurchase = moment(this.addReceiptForm.get('dateOfPurchase')?.value).format('YYYY.MM.DD');
      this.addReceiptForm.controls['dateOfPurchase'].setValue(dateOfPurchase);

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
          if (req) {
            this.openSnackBar('Paragon oraz obraz został dodany do bazy danych')
            this.addReceiptForm.reset()
          }
        }))
    }
  }

  addProduct() {
    this.listProducts.push(this.createProduct())
  }

  removeProduct(index: number) {
    this.listProducts.removeAt(index);
  }

  pasteTextIntoInput(event: string, $index = -1): void {
    if ($index >= 0) {

      this.listProducts.controls[$index].get(event)?.setValue(this.charactersSignalsService.getCharacters())
    } if (event === 'dateOfPurchase') {
      const clipboardText = this.charactersSignalsService.getCharacters()

      const datePattern = /^\d{2}-\d{2}-\d{4}$/;
      if (datePattern.test(clipboardText)) {
        const [day, month, year] = clipboardText.split('-').map(Number);
        const formattedDate = new Date(year, month - 1, day);
        this.addReceiptForm.controls[event]?.setValue(formattedDate);
      } else {
        this.logger.error('Błędny format daty w schowku');
      }
    } else {
      this.addReceiptForm.controls[event]?.setValue(this.charactersSignalsService.getCharacters())
    }
  }


  clearClipboard() {
    this.addReceiptForm.markAsUntouched()
    this.listProducts.markAsUntouched()
    this.charactersSignalsService.setCharacters('')
  }
}
