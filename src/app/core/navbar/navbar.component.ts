import { NgIf } from '@angular/common';
import { AfterContentChecked, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from 'src/app/shared/models/interface-user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterContentChecked {
  currentUser: User = {}
  constructor(public auth: AuthService) {}
  ngAfterContentChecked() {
    this.currentUser = this.auth.getIsAuthenticated() ? JSON.parse(this.auth.getCurrentDataUser()) as User : {}
  }
  loginOut(): void {
    this.auth.loginOut();
  }
}
