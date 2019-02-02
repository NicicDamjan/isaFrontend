import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Flight} from '../flight';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class FlightService {

  constructor(private http: HttpClient) { }

  getFlights(id: number): Observable<Flight[]> {
    return this.http.get<Flight[]>('http://localhost:8090/api/airlines/' + id + '/getAllFlights', httpOptions);
  }
  addFlight(id: number, flight: Flight): Observable<any> {
    const sendFlight = JSON.stringify(flight);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8090/api/airlines/' + id + '/addFlight', sendFlight, {headers: headers});
  }

  getFlight(airlineId: number, id: number): Observable<Flight> {
    return this.http.get<Flight>('http://localhost:8090/api/airlines/' + airlineId + '/flights/' + id + '/getFlight', httpOptions);
  }


}
