import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user..service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: User;
  public fullName: string;
  constructor(
    protected userService: UserService,
    protected authService: AuthService,
    protected router: Router
    ) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.fullName = localStorage.getItem('token');
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
