import { Component, effect } from '@angular/core';
import { PartialReceiptDataSet } from 'src/app/shared/models/interface-receipt';
import { ReceiptSignalsService } from '../../receipt/service/receipt/receipt-signals/receipt-signals.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  image: PartialReceiptDataSet[] = this.receiptSignalsService.getRecipt()

  constructor(private receiptSignalsService: ReceiptSignalsService) {
    effect(() => this.image = this.receiptSignalsService.getRecipt())
  }

  close() {
    this.image.filter((imageBase64: PartialReceiptDataSet) => imageBase64.visibleImageInDialog = false)
    this.receiptSignalsService.setRecipt(this.image)
  }
}
