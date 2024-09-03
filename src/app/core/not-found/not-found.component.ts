import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, CardComponent],
  interpolation: ['((', '))'],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  protected readonly status = '404';
  protected readonly message = 'Not Found';
}
