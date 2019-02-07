import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FastTicketReservationFlight} from '../FastTicketReservationFlight';
import {FastFlightResModel} from '../FastFlightResModel';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class FastFlightReservationsService {

  constructor(private http: HttpClient) { }

  getFastTickets(airlineId: number): Observable<FastFlightResModel[]> {

    return this.http.get<FastFlightResModel[]>('http://localhost:8090/api/airlines/' + airlineId + '/fastFlightReservations', httpOptions);

  }

  addFastTicket(airlineId: number, data1: FastTicketReservationFlight): Observable<any> {

    const data = JSON.stringify(data1);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8090/api/airlines/' + airlineId + '/addfastFlightReservation', data, {headers: headers});

  }


}
