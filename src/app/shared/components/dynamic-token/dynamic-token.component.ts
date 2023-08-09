import { Component, inject } from '@angular/core';
import { INJECTION_TOKEN } from '../../../app.component';
 
@Component({
  selector: 'app-dynamic-token',
  templateUrl: './dynamic-token.component.html',
})
export class DynamicTokenComponent {
  data = inject(INJECTION_TOKEN);  
}
