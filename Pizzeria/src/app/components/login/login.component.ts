import { ErrorDialogComponent } from './../dialog/error-dialog/error-dialog.component';
import { InformationDialogComponent } from './../dialog/information-dialog/information-dialog.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'app/model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'app/services/user..service';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, DialogPosition} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public loginForm: FormGroup;
  public openDialog: any;
  constructor(
    protected userService: UserService,
    protected route: Router,
    protected authService: AuthService,
    protected dialog: MatDialog,
    private spinner: NgxSpinnerService
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
    this.openDialog = this.dialog.open(InformationDialogComponent, {
      data: {message: 'Provera podataka...'},
      disableClose: true
    });
    this.user.username = this.loginForm.controls.username.value;
    this.user.password = this.loginForm.controls.password.value;
    this.userService.LogIn(this.user).subscribe((currentUser) => {
      if (currentUser != null) {
        console.log(currentUser);
        // tslint:disable-next-line: no-unused-expression
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', currentUser.token);
        console.log(localStorage.getItem('token'));
        // tslint:disable-next-line:only-arrow-functions
        this.closeInformationDialog(this.openDialog, this.spinner);
        this.route.navigate(['/home']);
      }
    },
    (err) => {
      this.openDialog.close();
      this.dialog.open(ErrorDialogComponent, {
        data: {message: err.error.message},
        disableClose: true
      });
      console.log(err.error.message);
    });
  }
  private closeInformationDialog(dialog: any, spinner: any) {
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      dialog.close();
      spinner.hide();
    }, 500);
  }
}
