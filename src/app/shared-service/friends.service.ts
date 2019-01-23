import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class FriendsService {

  constructor(private Http: HttpClient) { }


  getRequests(id): Observable<any> {

    return this.Http.get<any>('http://localhost:8084/friendship/getFriendRequest/' + id);

  }


  acceptRequest(id): Observable<any> {

    return this.Http.post<any>('http://localhost:8084/friendship/acceptRequest/'+id,{});

  }

  declineRequest(id): Observable<any> {

    return this.Http.post<any>('http://localhost:8084/friendship/declineRequest/' + id,{});

  }

  getFriends(id): Observable<any> {

    return this.Http.get<any>('http://localhost:8084/friendship/getFriend/' + id);

  }

}
