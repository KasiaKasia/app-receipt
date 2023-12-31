import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { ReceiptAdditionComponent } from './pages/receipt-addition/receipt-addition.component';
import { ReceiptListComponent } from './pages/receipt-list/receipt-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DatepickerComponent } from '../components/datepicker/datepicker.component';
import { NipFormatPipe } from './pipe/nip-format.pipe';
import { HighlightDirective } from 'src/app/shared/directive/highlight.directive';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from "../../shared/shared.module";
import { ValidatorCharacterIsNumberDirective } from 'src/app/shared/validator-directive/validator-character-is-number.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ReceiptRoutingModule } from './receipt-routing.module';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        ReceiptComponent,
        ReceiptAdditionComponent,
        ReceiptListComponent,
        DatepickerComponent,
        NipFormatPipe,
        HighlightDirective,
        FileUploadComponent,
        ValidatorCharacterIsNumberDirective
    ],
    exports: [
        ReceiptComponent,
        ReceiptAdditionComponent,
        ReceiptListComponent,
        DatepickerComponent,
        FileUploadComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule, 
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule,
        MatSnackBarModule,
        MomentDateModule,
        SharedModule,
        ReceiptRoutingModule        
    ],
    providers: [NgbActiveModal, NgbModal]
})
export class ReceiptModule {}
