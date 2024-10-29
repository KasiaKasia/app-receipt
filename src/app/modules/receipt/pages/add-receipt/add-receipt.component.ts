import { AfterViewChecked, ChangeDetectionStrategy, Component, input, OnDestroy, ViewChild } from '@angular/core';
import { FormArray, FormBuilder,  FormGroup } from '@angular/forms';
import { ReceiptService } from '../../service/receipt/receipt.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarAnnotatedComponent } from 'src/app/shared/components/snack-bar/snack-bar-annotated/snack-bar-annotated.component';
import { User } from 'src/app/shared/models/interface-user';
import * as _moment from 'moment';
import { Subscription, forkJoin } from 'rxjs';
import { FileUploadComponent } from 'src/app/modules/components/file-upload/file-upload.component';
import { CharactersSignalsService } from '../../service/characters/characters-signals.service';
import { LoggerService } from 'src/app/shared/logger/logger.service';
import { ImportsModuleAddRecipt } from 'src/app/modules/imports-module/imports-modile-add-receipt';
import { WordPosition, WordPositionAdapter } from '../../service/adapter/words.adapter';
import { FormService } from '../../service/form/form.service';
const moment = _moment;

@Component({
  selector: 'app-add-receipt',
  standalone: true,
  imports: [ImportsModuleAddRecipt],
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReceiptComponent implements OnDestroy, AfterViewChecked {
  readonly subscriptions$ = new Subscription()
  protected readonly title = input<string>('Dodaj paragon');
  protected wordPosition: WordPosition[] = []
  @ViewChild(FileUploadComponent)
  base64Ref!: FileUploadComponent;
  userId: User = {};
  protected addReceiptForm: FormGroup = this.formService.createForm()
  
  get listProducts() {
    return this.addReceiptForm.get('listProducts') as FormArray;
  }

  constructor(private logger: LoggerService,
    public formBuilder: FormBuilder,
    private formService: FormService,
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
    this.listProducts.push(this.formService.createProduct())
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

  pasteBasicReceiptInformation() {
    const adapter = new WordPositionAdapter(this.wordPosition);
    const basicReceiptInformation = adapter.adapt();

    if (basicReceiptInformation) {
      this.addReceiptForm.controls['shopName'].setValue(basicReceiptInformation.shopName)
      this.addReceiptForm.controls['nip'].setValue(basicReceiptInformation.nip)
      this.addReceiptForm.controls['totalPrice'].setValue(basicReceiptInformation.totalPrice)
    }

  }

  handleWordsAndPositions(wordsAndPositions: WordPosition[]): WordPosition[] {
    return this.wordPosition = wordsAndPositions
  }
}
