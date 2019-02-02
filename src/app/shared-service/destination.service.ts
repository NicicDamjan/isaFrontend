import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Destination} from '../Destination';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AirlineServiceModel} from '../airlineServiceModel';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class DestinationService {

  constructor(private http: HttpClient) { }

  getDestinations(airlineId: number): Observable<Destination[]> {
    return this.http.get<Destination[]>('http://localhost:8090/api/airlines/' + airlineId + '/getAllDestinations', httpOptions);
  }

  addDestination(airlineId: number, dest : Destination) : Observable<any>{
    const sendDest = JSON.stringify(dest);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8090/api/airlines/' + airlineId + '/addDestination', sendDest, {headers: headers});
  }

  getDestination(destId: number): Observable<Destination> {
    return this.http.get<Destination>('http://localhost:8090/api/airlines/' + destId + '/getDestination', httpOptions);
  }

  editDestination(destId: number, d: Destination) : Observable<any> {
    const sendDest = JSON.stringify(d);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8090/api/airlines/' + destId + '/updateDestination', sendDest, {headers: headers});
  }

}
