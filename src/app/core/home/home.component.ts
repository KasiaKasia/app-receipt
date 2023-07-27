import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Projekt wykonała Katarzyna Bulicka';
  titleCard = 'Lista technologii';
  databaseSchema = 'Schemat bazy danych'
}
