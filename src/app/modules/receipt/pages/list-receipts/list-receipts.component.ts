import { Component, DestroyRef, effect, HostListener, inject, input, SecurityContext } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../../../shared/models/interface-user';
import { ReceiptService } from '../../service/receipt/receipt.service';
import { AuthService } from '../../../../shared/services/auth.service';
import * as _moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Visible, Image, Receipt, Product, PartialReceiptDataSet } from '../../../../shared/models/interface-receipt';
import { LoggerService } from '../../../../shared/logger/logger.service';
import { DashboardHeadingComponent } from 'src/app/shared/components/dashboard-heading/dashboard-heading.component';
import { ModalContainerComponent } from 'src/app/shared/components/modal/modal-container/modal-container.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LoadingService } from '../../service/loading/loading.service';
import { DialogComponent } from 'src/app/modules/components/dialog/dialog.component';
import { ReceiptSignalsService } from '../../service/receipt/receipt-signals/receipt-signals.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-receipts',
  standalone: true,
  imports: [DashboardHeadingComponent, ModalContainerComponent, NgIf, NgFor, DialogComponent, NgClass],
  templateUrl: './list-receipts.component.html',
  styleUrls: ['./list-receipts.component.scss']
})
export class ListReceiptsComponent {
  destroyRef = inject(DestroyRef)
  isLoading = this.loadingService.getLoading()
  title = input<string>('Lista paragonów');
  moment = _moment;
  private currentUser: User = {} = JSON.parse(this.authService.getCurrentDataUser()) as User;
  listOfReceipts$ = this.receiptService.getListOfReceipts(this.currentUser.userid) ?? []
  listOfReceipts: any[] = []
  listOfReceiptsWithProducts!: Partial<Visible[]> & Partial<Image[]> & Partial<Receipt[]> & Partial<Product[]>
  productsReceipt: any[] = []
  imageReceipt: PartialReceiptDataSet[][] = [];
  protected isVisible = false;
  constructor(public receiptService: ReceiptService,
    public authService: AuthService,
    private _sanitizer: DomSanitizer,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private logger: LoggerService,
    private loadingService: LoadingService,
    private router: Router,
    protected receiptSignalsService: ReceiptSignalsService
  ) {
    effect(() => {
      this.isLoading = this.loadingService.getLoading()
    })

    this.listOfReceipts$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      if (res && res.respons)
        this.listOfReceiptsWithProducts = [...res.respons];
      this.listOfReceipts = this.listOfReceiptsWithProducts.filter((objectProduct: any, index: number, receipts: any) =>
        receipts.findIndex((v2: any) => (v2.receiptId === objectProduct.id)) === index)
    })
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 200;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  showImageThumbnail(receiptId: number) {
    this.imageReceipt[receiptId] = [...this.listOfReceiptsWithProducts].filter((image: any) =>
      image.receiptId === receiptId) as PartialReceiptDataSet[];

    this.imageReceipt[receiptId].find((imageBase64: any) => {
      if (imageBase64.receiptId === receiptId) {
        imageBase64.visibleImageSmall = !imageBase64.visibleImageSmall
        imageBase64.base64 = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, this._sanitizer.bypassSecurityTrustResourceUrl(imageBase64.base64))
      }
    })
  }

  showImageinDialogue(receiptId: number) {
    this.imageReceipt[receiptId] = [] = [...this.listOfReceiptsWithProducts].filter((image: any) =>
      image.receiptId === receiptId) as PartialReceiptDataSet[];;

    this.imageReceipt[receiptId].filter((imageBase64: any) => {
      if (imageBase64.receiptId === receiptId) {
        imageBase64.visibleImageInDialog = !imageBase64.visibleImageInDialog
        imageBase64.base64 = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, this._sanitizer.bypassSecurityTrustResourceUrl(imageBase64.base64))
      }
    })
    this.receiptSignalsService.setRecipt(this.imageReceipt[receiptId] as PartialReceiptDataSet[])
  }
  receiptDetails(receiptId: number) {
    this.router.navigate(['receipt/receipt-details/', receiptId]);
  }
  notLoaded() {
    this.logger.error('The image could not be loaded');
  }
}