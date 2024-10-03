import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { NipFormatPipe } from '../receipt/pipe/nip-format.pipe';
import { ValidatorCharacterIsNumberDirective } from 'src/app/shared/validator-directive/validator-character-is-number.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardHeadingComponent } from 'src/app/shared/components/dashboard-heading/dashboard-heading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from 'src/app/shared/directive/highlight.directive';
 
@NgModule({
    imports: [
        NgIf, 
        NipFormatPipe,
        ValidatorCharacterIsNumberDirective,
        MatProgressBarModule,
        ReactiveFormsModule,
        FileUploadComponent,
        DashboardHeadingComponent,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        HighlightDirective
    ],
    exports: [
        NgIf, 
        NipFormatPipe,
        ReactiveFormsModule,
        ValidatorCharacterIsNumberDirective,     
        FileUploadComponent,
        DashboardHeadingComponent,
        MatButtonModule,
        MatDatepickerModule,
        MatProgressBarModule,     
        MatInputModule,
        HighlightDirective
    ]
})
export class ImportsModuleAddRecipt { }