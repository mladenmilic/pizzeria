import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'app/model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
public currentUser: User = new User();
public listUsers: User [] = [
  {
    userId: 1,
    fullName: 'Mladen Milic',
    password: 'mladja',
    username: 'mladja',
    role: 'manager'
  },
  {
    userId: 2,
    fullName: 'Laza Lazic',
    password: 'laza',
    username: 'laza',
    role: 'worker'
  }
];
  constructor(
    protected http: HttpClient
  ) { }

  public LogIn(user: User): Observable <any> {
    return this.http.post('https://localhost:44329/user/list-user/user', user);
  }
}
