import { Component } from '@angular/core';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { DashboardHeadingComponent } from 'src/app/shared/components/dashboard-heading/dashboard-heading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports:[CardComponent, DashboardHeadingComponent]
})
export class HomeComponent {
  title = 'Projekt wykonała Katarzyna Bulicka';
  titleCard = 'Lista technologii';
  databaseSchema = 'Schemat bazy danych';
  libraryList = 'Lista bibliotek - Front-end';
}
