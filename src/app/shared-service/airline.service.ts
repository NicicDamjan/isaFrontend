import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Airline} from '../airline';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class AirlineService {
 
  private  BASE_URL = 'http://localhost:8090/api';
  private ALL_AIRLINES_URL = this.BASE_URL + '/airlines/getAllAirlines';
  private airline: Airline;


  constructor(private http: HttpClient) { }

  getAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>('http://localhost:8090/api/airlines/getAllAirlines', httpOptions);
  }

  getAirline(airlineId: number): Observable<Airline> {
    return this.http.get<Airline>('http://localhost:8090/api/airlines/getAirline/' + airlineId, httpOptions);
  }

  addNewAirline(airline: Airline): Observable<any> {
    const body = JSON.stringify(airline);
    return this.http.post('http://localhost:8090/api/airlines/add', body, httpOptions);
  }

}
