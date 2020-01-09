import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'app/services/user..service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public loginForm: FormGroup;

  constructor( protected userService: UserService, protected route: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }
  public onSubmit() {
    this.user.username = this.loginForm.controls.username.value;
    this.user.password = this.loginForm.controls.password.value;
    const currentUser = this.userService.LogIn(this.user);
    if (currentUser) {
      // tslint:disable-next-line: no-unused-expression
      this.route.navigate(['/home']);
    }
  }
}
