import { Component } from '@angular/core';
import { User } from '../../../../shared/models/interface-user';
import { Product, Receipt } from '../../../../shared/models/interface-receipt';
import { ReceiptService } from '../../../../modules/receipt/service/receipt/receipt.service';
import { AuthService } from '../../../../shared/services/auth.service';
import * as _moment from 'moment';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent {
  moment = _moment;
  private currentUser: User = {} = JSON.parse(this.authService.getCurrentDataUser()) as User;
  listOfReceipts$ = this.receiptService.getListOfReceipts(this.currentUser.userid) ?? []
  listOfReceipts: any[]   = []
  listOfReceiptsWithProducts:any[]  = []
  productsReceipt: any[]  =[]
  visible: boolean[] = [];
  constructor(public receiptService: ReceiptService,
    public authService: AuthService) {
    this.listOfReceipts$.subscribe((res: any) => {
      if (res && res.respons)
       this.listOfReceiptsWithProducts =  res.respons;
       this.listOfReceiptsWithProducts.map(value => value.visible=false)
  
        this.listOfReceipts =   res.respons.filter((objectProduct: any, index: number, receipts: any) =>
          receipts.findIndex((v2: any) => (v2.receiptId === objectProduct.id)) === index)
          
 
    })
  }
  show(receiptId :   number   ) {
 
          this.productsReceipt[ receiptId ]=this.listOfReceiptsWithProducts.filter(listReceipts => 
            listReceipts.receiptId === receiptId );
            this.productsReceipt[ receiptId ].find((listReceipts:any) => {
             if( listReceipts.receiptId === receiptId) {
              listReceipts.visible = !listReceipts.visible
             }

            }) 
   }
}
