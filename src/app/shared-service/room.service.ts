import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../Room';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class RoomService {
  private  BASE_URL = 'http://localhost:8090/api';
  constructor(private http: HttpClient) { }

  getAllRooms(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/hotels/` + id + '/rooms', httpOptions);
  }
  getRoom(id: number): Observable<any> {
     return this.http.get(`${this.BASE_URL}/rooms/` + id);
  }

}
