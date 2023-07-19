import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-snack-bar-annotated',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule],
  templateUrl: './snack-bar-annotated.component.html',
  styleUrls: ['./snack-bar-annotated.component.scss']
})
export class SnackBarAnnotatedComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<any>) { }
}
