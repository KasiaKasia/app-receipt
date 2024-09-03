import { Component,  model, ModelSignal } from '@angular/core';

@Component({
  selector: 'app-dashboard-heading',
  standalone: true,
  templateUrl: './dashboard-heading.component.html',
})
export class DashboardHeadingComponent { 
  dashboardHeaderTitle: ModelSignal<string> = model.required<string>();
}
