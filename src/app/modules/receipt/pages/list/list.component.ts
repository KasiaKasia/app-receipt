import { Component, SecurityContext } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ReceiptService } from '../../service/receipt/receipt.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/interface-user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Visible, Image, Receipt, Product } from '../../../../shared/models/interface-receipt';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';


export enum KeyType {
  Id = 'ID',
  name = 'name',
  receiptId = 'receiptId',
  storeName = 'storeName',
  NIP = 'NIP',
  price = 'price',
  dateOfPurchase = 'dateOfPurchase',
  quantity = 'quantity',
  productTotalPrice = 'productTotalPrice',
  totalPrice = 'totalPrice',
  userId = 'userId',
  visibleReceipts = 'visibleReceipts',
  base64 = 'base64',
  nameImage = 'nameImage',
  expand = 'expand'
}
export enum ValueType {
  Id = 'ID',
  name = 'name',
  receiptId = 'Id paragonu',
  storeName = 'Nazwa sklepu',
  NIP = 'NIP',
  price = 'Cena',
  dateOfPurchase = 'Data zakupu',
  quantity = 'Ilość sztuk',
  productTotalPrice = 'Łączna cena za sztukę/i',
  totalPrice = 'Cena za sztukę',
  userId = 'id użytkownika',
  visibleReceipts = 'widoczne paragony',
  base64 = 'base64',
  nameImage = 'Nazwa zdjęcia paragonu',
  expand = 'Akcje'
}
export interface AttributeObject {
  key: KeyType;
  value: ValueType;
}

type BaseTypeColumns = KeyType.Id | KeyType.receiptId | KeyType.storeName | KeyType.NIP | KeyType.price | KeyType.dateOfPurchase | KeyType.expand;
type BaseMapTypeColumns = ValueType.Id | ValueType.receiptId | ValueType.storeName | ValueType.NIP | ValueType.price | ValueType.dateOfPurchase | ValueType.expand;
type DetailedTypeColumns = KeyType.quantity | KeyType.productTotalPrice | KeyType.totalPrice | KeyType.price | KeyType.userId | KeyType.visibleReceipts | KeyType.base64 | KeyType.nameImage;

type DerivedType = Exclude<BaseTypeColumns, ValueType.expand>;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent {
  private currentUser: User = {} = JSON.parse(this.authService.getCurrentDataUser()) as User;
  listOfReceipts$ = this.receiptService.getListOfReceipts(this.currentUser.userid) ?? []
  dataSource = [];
  listOfReceipts: any[] = []
  columnsToDisplay = ['id', 'receiptId', 'symbol', 'position'];
  columnDefinition: DerivedType[] = [KeyType.Id, KeyType.receiptId, KeyType.storeName, KeyType.NIP, KeyType.price, KeyType.dateOfPurchase];
  listOfReceiptsWithProducts!: Partial<Visible[]> & Partial<Image[]> & Partial<Receipt[]> & Partial<Product[]>

  columnsToDisplayWithExpand = [...this.columnDefinition, 'expand'];
  expandedElement!: any | null;

  productsReceipt: any[] = []
  imageReceipt: any[] = [];
  constructor(public receiptService: ReceiptService,
    public authService: AuthService, 
    private _sanitizer: DomSanitizer,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal, ) {
    this.listOfReceipts$.pipe(takeUntilDestroyed()).subscribe((res: any) => {
      if (res && res.respons)
         this.dataSource = res.respons;
      console.log(this.dataSource)
      this.listOfReceiptsWithProducts = [...res.respons];
      console.log('res.respons', res.respons)
            this.listOfReceipts = this.listOfReceiptsWithProducts.filter((objectProduct: any, index: number, receipts: any) =>
              receipts.findIndex((v2: any) => (v2.receiptId === objectProduct.id)) === index)
    })
  }
  getValueFromKey(key: ValueType | string): string | ValueType {
    for (const enumKey of Object.keys(ValueType)) {
      if (enumKey === key) {
        return ValueType[enumKey as keyof typeof ValueType];
      }
    }
    return ''
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

}

export interface PeriodicElement {
  id: string;
  position: number;
  receiptId: number;
  symbol: string;
  description: string;
}

export const ELEMENT_DATA = [
  {
    position: 1,
    id: 'Hydrogen',
    receiptId: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },

  {
    position: 10,
    id: 'Neon',
    receiptId: 20.33,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];


/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */