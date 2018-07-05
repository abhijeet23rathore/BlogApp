import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http
      .get<{ message: string; users: any }>("http://localhost:3000/api/users")
      .pipe(
        map(userData => {
          return userData.users.map(user => {
            return {
              name: user.name,
              phone: user.phone,
              id: user.userid
            };
          });
        })
      );
  }

  getFriends(id: string) {
      return this.http
      .get<{ message: string; friends: any }>("http://localhost:3000/api/users/friends/"+id)
      .pipe(
        map(userData => {
          return userData.friends.map(user => {
            return {
              name: user.name,
              phone: user.phone,
              id: user.userid
            };
          });
        })
      );
  }
}
