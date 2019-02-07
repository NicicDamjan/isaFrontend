import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../user';
import {Observable} from 'rxjs';
import {LoginModel} from '../login.model';
import {Admin} from '../admin';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class AccountService {

  private BASE_URL = 'http://localhost:8090/api/account';

  constructor(private http: HttpClient) { }

  registration(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.BASE_URL}/sign-up`, body, {headers: headers});

  }

  login(object: LoginModel): Observable<any> {
    const body = JSON.stringify(object);
    const  headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.BASE_URL}/log-in`, body, {headers: headers});
  }

  registerHotelAdmin(admin: Admin): Observable<any> {
    const body = JSON.stringify(admin);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.BASE_URL}/sign-up-hotelAdmin`, body, {headers: headers});

  }

  registerRentacarAdmin(admin: Admin): Observable<any> {
    const body = JSON.stringify(admin);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.BASE_URL}/sign-up-rentacarAdnim`, body, {headers: headers});

  }

  registerAirlineAdmin(admin: Admin): Observable<any> {
    const body = JSON.stringify(admin);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.BASE_URL}/sign-up-airlineAdnim`, body, {headers: headers});

  }

  registerSysAdmin(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.BASE_URL}/admins`, body, {headers: headers});

  }
  getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  logout(): void {
    //this.http.get(`${this.BASE_URL}/logout`, httpOptions)
    localStorage.clear();
  }


}
