import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeComponent,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,

  ]
})
export class CoreModule {}
