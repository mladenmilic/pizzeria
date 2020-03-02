import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'app/services/user..service';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public loginForm: FormGroup;

  constructor(
    protected userService: UserService,
    protected route: Router,
    protected authService: AuthService
    ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.authService.logout();
  }
  public onSubmit() {
    this.user.username = this.loginForm.controls.username.value;
    this.user.password = this.loginForm.controls.password.value;
    this.userService.LogIn(this.user).subscribe((currentUser) => {
      if (currentUser) {
        // tslint:disable-next-line: no-unused-expression
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', currentUser.token);
        console.log(localStorage.getItem('token'));
        this.route.navigate(['/home']);
      }
    },
    (err) => {
      console.log(err);
    });
  }
}
