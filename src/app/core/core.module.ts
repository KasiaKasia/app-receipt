import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule,
    HomeComponent,
    SharedModule,
    NotFoundComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent, 
    HomeComponent, 
    NotFoundComponent,
    FooterComponent
  ]
})
export class CoreModule { }
