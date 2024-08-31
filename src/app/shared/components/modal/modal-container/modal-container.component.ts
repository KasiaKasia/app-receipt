import { Component, Input } from '@angular/core';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [],
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent {
  @Input()
  listOfReceiptsWithProducts: any[] = []
  @Input('receiptId')
  receiptId!: number;
  imageReceipt: any[] = [];
  
  constructor(public modalService: NgbModal) {}
  
  openModal() {
    const modalRef = this.modalService.open(ModalContentComponent);
    this.imageReceipt[this.receiptId] = [] = this.listOfReceiptsWithProducts.filter(image =>
      image.receiptId === this.receiptId);
    modalRef.componentInstance.receiptId = this.receiptId;
    modalRef.componentInstance.imageReceipt = this.imageReceipt[this.receiptId];
  }
}
