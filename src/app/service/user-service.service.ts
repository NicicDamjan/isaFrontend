import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

@Injectable()
export class UserService {

    private baseUrl: String = 'http://localhost:8084/user';
    private user: User;
    constructor(private httpClient: HttpClient) {}

    createUser(u: any) {
      console.log('Usao da salje');
      this.user = u;
      const headers = new Headers({'Content-Type': 'application/json'});
      const body = JSON.stringify(this.user);
      console.log(this.user);
      this.httpClient.post('http://localhost:8084/user/registration',
      {name: this.user.name,
       surname: this.user.surname,
      email: this.user.email,
      password1: this.user.password1,
      password2: this.user.password2,
      phonenumber: this.user.phonenumber,
      city: this.user.city})
      .subscribe(
      (data: any) => { alert(data.message); }
      );
      console.log('Trebalo bi da je poslao');
      }
}
