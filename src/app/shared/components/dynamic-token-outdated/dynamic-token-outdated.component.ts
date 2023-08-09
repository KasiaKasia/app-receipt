import { Component, inject } from '@angular/core';
 import { INJECTION_TOKEN } from '../../../app.component';

@Component({
  selector: 'app-dynamic-token-outdated', 
  templateUrl: './dynamic-token-outdated.component.html',
  styleUrls: ['./dynamic-token-outdated.component.scss']
})
export class DynamicTokenOutdatedComponent {
  data = inject(INJECTION_TOKEN);  
}
