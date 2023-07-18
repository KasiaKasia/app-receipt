import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { ReceiptRoutingModule } from './receipt-routing.module';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { ReceiptAdditionComponent } from './pages/receipt-addition/receipt-addition.component';
import { ReceiptListComponent } from './pages/receipt-list/receipt-list.component';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DatepickerComponent } from '../components/datepicker/datepicker.component';
import { NipFormatPipe } from './pipe/nip-format.pipe';
import { HighlightDirective } from 'src/app/shared/directive/highlight.directive';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    ReceiptComponent,
    ReceiptAdditionComponent,
    ReceiptListComponent,
    DatepickerComponent,
    NipFormatPipe,
    HighlightDirective,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    ReceiptRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatIconModule, MatProgressBarModule
  ],
  exports: [
    ReceiptComponent,
    ReceiptAdditionComponent,
    ReceiptListComponent,
    DatepickerComponent,
    FileUploadComponent
  ]
})
export class ReceiptModule { }
