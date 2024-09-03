import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  interpolation: ['(', ')'], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected readonly description ='© 2023 Copyright: Katarzyna Bulicka'
}
