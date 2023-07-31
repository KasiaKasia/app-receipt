import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardHeadingComponent } from './components/dashboard-heading/dashboard-heading.component';
import { CardComponent } from './components/card/card.component';
import { ModalContentComponent } from './components/modal/modal-content/modal-content.component';


@NgModule({
  declarations: [DashboardHeadingComponent, CardComponent, ModalContentComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  exports: [DashboardHeadingComponent, CardComponent, ModalContentComponent]
})
export class SharedModule {}
