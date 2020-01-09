import { Injectable } from '@angular/core';
import { User } from 'app/model/user';

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
  constructor() { }

  public LogIn(user: User): User {
     // tslint:disable-next-line: variable-name
     const _user = this.listUsers.find(
        u => u.username === user.username && u.password === user.password
     );
     this.currentUser = _user;
     return _user;
  }
}
