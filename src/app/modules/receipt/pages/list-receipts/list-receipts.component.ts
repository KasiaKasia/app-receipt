import { Component, effect, input, SecurityContext } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../../../shared/models/interface-user';
import { ReceiptService } from '../../service/receipt/receipt.service';
import { AuthService } from '../../../../shared/services/auth.service';
import * as _moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Visible, Image, Receipt, Product } from '../../../../shared/models/interface-receipt';
import { LoggerService } from '../../../../shared/logger/logger.service';
import { DashboardHeadingComponent } from 'src/app/shared/components/dashboard-heading/dashboard-heading.component';
import { ModalContainerComponent } from 'src/app/shared/components/modal/modal-container/modal-container.component';
import { NgFor, NgIf } from '@angular/common';
import { LoadingService } from '../../service/loading/loading.service';


@Component({
  selector: 'app-list-receipts',
  standalone: true,
  imports: [DashboardHeadingComponent, ModalContainerComponent, NgIf, NgFor], 
  templateUrl: './list-receipts.component.html',
  styleUrls: ['./list-receipts.component.scss']
})
export class ListReceiptsComponent {
  isLoading = this.loadingService.getLoading()
  title = input<string>('Lista paragonów');
  moment = _moment;
  private currentUser: User = {} = JSON.parse(this.authService.getCurrentDataUser()) as User;
  listOfReceipts$ = this.receiptService.getListOfReceipts(this.currentUser.userid) ?? []
  listOfReceipts: any[] = []
  listOfReceiptsWithProducts!: Partial<Visible[]> & Partial<Image[]> & Partial<Receipt[]> & Partial<Product[]>
  productsReceipt: any[] = []
  imageReceipt: any[] = [];
  constructor(public receiptService: ReceiptService,
    public authService: AuthService,
    private _sanitizer: DomSanitizer,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private logger: LoggerService,
    private loadingService: LoadingService
  ) {     
      effect(() => {
        this.isLoading = this.loadingService.getLoading()
      })    

    this.listOfReceipts$.pipe(takeUntilDestroyed()).subscribe((res: any) => {
      if (res && res.respons)
        this.listOfReceiptsWithProducts = [...res.respons];
      this.listOfReceipts = this.listOfReceiptsWithProducts.filter((objectProduct: any, index: number, receipts: any) =>
        receipts.findIndex((v2: any) => (v2.receiptId === objectProduct.id)) === index)
    })
  }

  showProducts(receiptId: number) {
    this.productsReceipt[receiptId] = this.listOfReceiptsWithProducts.filter((listReceipts: any) =>
      listReceipts.receiptId === receiptId);
    this.productsReceipt[receiptId].find((listReceipts: any) => {
      if (listReceipts.receiptId === receiptId) {
        listReceipts.visibleReceipts = !listReceipts.visibleReceipts
      }
    })
  }

  showImage(receiptId: number) {
    this.imageReceipt[receiptId] = [] = this.listOfReceiptsWithProducts.filter((image: any) =>
      image.receiptId === receiptId);
    this.imageReceipt[receiptId].find((imageBase64: any) => {
      if (imageBase64.receiptId === receiptId) {
        imageBase64.visibleImage = !imageBase64.visibleImage
        imageBase64.base64 = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, this._sanitizer.bypassSecurityTrustResourceUrl(imageBase64.base64))
      }
    })
  }
  notLoaded() {
    this.logger.error('The image could not be loaded');
  }
}