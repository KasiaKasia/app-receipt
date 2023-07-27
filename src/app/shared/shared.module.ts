import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardHeadingComponent } from './components/dashboard-heading/dashboard-heading.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations:[DashboardHeadingComponent, CardComponent],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [DashboardHeadingComponent, CardComponent]
})
export class SharedModule {}
