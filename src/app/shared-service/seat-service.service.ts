import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Flight} from '../flight';
import {Seat} from '../seat';
import {Airline} from '../airline';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class SeatService {

  constructor(private http: HttpClient) { }

  getSeats(flightId: number, airlineId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>('http://localhost:8090/api/airlines/' + airlineId + '/flights/' + flightId + '/getSeats', httpOptions);
 }

 addSeats(flightId: number, airlineId: number, num : number){

  const body = JSON.stringify(num);
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post('http://localhost:8090/api/flights/' + flightId + '/addSeats', body,
    {headers: headers});
}

}
