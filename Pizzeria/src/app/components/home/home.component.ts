import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/services/user..service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: User;

  constructor( protected userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }

}
