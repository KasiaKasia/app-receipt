import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { ListReceiptsComponent } from './pages/list-receipts/list-receipts.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DatepickerComponent } from '../components/datepicker/datepicker.component';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidatorCharacterIsNumberDirective } from 'src/app/shared/validator-directive/validator-character-is-number.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ReceiptRoutingModule } from './receipt-routing.module';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { ListComponent } from './pages/list/list.component';
import { AddReceiptComponent } from './pages/add-receipt/add-receipt.component';
 
@NgModule({
    imports: [
        CommonModule,
        ListComponent,
        DatepickerComponent,
        ReceiptComponent,     
        ValidatorCharacterIsNumberDirective,
        FileUploadComponent,
        AddReceiptComponent,
        ListReceiptsComponent,
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
        ReceiptRoutingModule,
        MatTableModule
    ],
    providers: [NgbActiveModal, NgbModal]
})
export class ReceiptModule {}
