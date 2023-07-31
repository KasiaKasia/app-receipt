import { Component, SecurityContext } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../../../shared/models/interface-user';
import { ReceiptService } from '../../../../modules/receipt/service/receipt/receipt.service';
import { AuthService } from '../../../../shared/services/auth.service';
import * as _moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from 'src/app/shared/components/modal/modal-content/modal-content.component';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent {
  title = 'Lista paragonów';
  moment = _moment;
  private currentUser: User = {} = JSON.parse(this.authService.getCurrentDataUser()) as User;
  listOfReceipts$ = this.receiptService.getListOfReceipts(this.currentUser.userid) ?? []
  listOfReceipts: any[] = []
  listOfReceiptsWithProducts: any[] = []
  productsReceipt: any[] = []
  imageReceipt: any[] = [];
  constructor(public receiptService: ReceiptService,
    public authService: AuthService,
    private _sanitizer: DomSanitizer,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal) {
    this.listOfReceipts$.pipe(takeUntilDestroyed()).subscribe((res: any) => {
      if (res && res.respons)
        this.listOfReceiptsWithProducts = res.respons;
      this.listOfReceiptsWithProducts.map(value => { value.visibleReceipts = false; value.visibleImage = false })

      this.listOfReceipts = res.respons.filter((objectProduct: any, index: number, receipts: any) =>
        receipts.findIndex((v2: any) => (v2.receiptId === objectProduct.id)) === index)
    })
  }

  showProducts(receiptId: number) {
    this.productsReceipt[receiptId] = this.listOfReceiptsWithProducts.filter(listReceipts =>
      listReceipts.receiptId === receiptId);
    this.productsReceipt[receiptId].find((listReceipts: any) => {
      if (listReceipts.receiptId === receiptId) {
        listReceipts.visibleReceipts = !listReceipts.visibleReceipts
      }
    })
  }

  showImage(receiptId: number) {
    this.imageReceipt[receiptId] = [] = this.listOfReceiptsWithProducts.filter(image =>
      image.receiptId === receiptId);
    this.imageReceipt[receiptId].find((imageBase64: any) => {
      if (imageBase64.receiptId === receiptId) {
          imageBase64.visibleImage = !imageBase64.visibleImage
          imageBase64.base64 = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, this._sanitizer.bypassSecurityTrustResourceUrl(imageBase64.base64))
      }
    })
  }

  openModal(receiptId: number) {
    const modalRef = this.modalService.open(ModalContentComponent);
    this.imageReceipt[receiptId] = [] = this.listOfReceiptsWithProducts.filter(image =>
      image.receiptId === receiptId);
    modalRef.componentInstance.receiptId = receiptId;
    modalRef.componentInstance.imageReceipt = this.imageReceipt[receiptId];
  }
}

