import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/shared/models/interface-user';
import { ReceiptService } from 'src/app/modules/receipt/service/receipt/receipt.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent {
  private currentUser: User = {} = JSON.parse(this.authService.getCurrentDataUser()) as User ;
  listOfReceipts = this.receiptService.getListOfReceipts(this.currentUser.userid) // ?? []
  constructor(public receiptService: ReceiptService,
              public authService: AuthService) {}
}
