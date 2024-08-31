import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoggerService } from '../../../../shared/logger/logger.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {
  @Input() public receiptId!: number;
  @Input() public imageReceipt!: any[];
  width = 400
  height = 400
  constructor(public activeModal: NgbActiveModal,
              private logger: LoggerService) {}
  ngOnInit() {
    let img = new Image();
    img.src = this.imageReceipt[0].base64;
    img.onload = () => {
      this.width = img.width
      this.height = img.height;
    }
  }

  passBack() {
    this.activeModal.close();
  }
  notLoaded(){
    this.logger.error('The image could not be loaded');
  }
}