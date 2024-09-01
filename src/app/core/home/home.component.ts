import { Component } from '@angular/core';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { DashboardHeadingComponent } from 'src/app/shared/components/dashboard-heading/dashboard-heading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CardComponent, DashboardHeadingComponent]
})
export class HomeComponent {
  protected readonly title = 'Projekt wykonała Katarzyna Bulicka';
  protected readonly titleCard = 'Lista technologii';
  protected readonly databaseSchema = 'Schemat bazy danych';
  protected readonly libraryList = 'Lista bibliotek - Front-end';
}
