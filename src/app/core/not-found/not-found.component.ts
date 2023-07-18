import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  interpolation: ['((','))'],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  status = '404';
  message = 'Not Found';
}
