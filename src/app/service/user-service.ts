import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    get(): Observable<any> {
        console.log('cao')
        return this.http.get('http://localhost:8090/api/user/3', {
            headers: new HttpHeaders({ 'Content-Type': 'application/json'})
          })
    }

}