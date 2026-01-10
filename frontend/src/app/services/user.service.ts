import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' },
    { id: 3, name: 'Amit' }
  ];

  getUsers() {
    return this.users;
  }
}
