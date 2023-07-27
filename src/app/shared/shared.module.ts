import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardHeadingComponent } from './components/dashboard-heading/dashboard-heading.component';


@NgModule({
  declarations:[DashboardHeadingComponent],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [DashboardHeadingComponent]
})
export class SharedModule {}
