import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-heading',
  standalone: true,
  templateUrl: './dashboard-heading.component.html',
})
export class DashboardHeadingComponent {
  @Input('titleDashboard')
  title = '';
}
