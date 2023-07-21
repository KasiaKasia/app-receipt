import { Component } from '@angular/core';
import { User } from '../../../../shared/models/interface-user';
import { Receipt } from '../../../../shared/models/interface-receipt';
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
  listOfReceipts: Receipt[] = []
  constructor(public receiptService: ReceiptService,
    public authService: AuthService) {
    this.listOfReceipts$.subscribe((res: any) => {
      if (res && res.respons)
        this.listOfReceipts = res.respons
    })
  }
}
