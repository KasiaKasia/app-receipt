import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IsAuthenticatedLocalStorageService } from 'src/app/shared/services/local-storage/is-authenticated/is-authenticated-local-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  constructor( 
    public isAuthenticatedLocalStorageService: IsAuthenticatedLocalStorageService,
    public auth: AuthService) {}
 
  loginOut(): void {
    this.auth.loginOut();
  }
}
