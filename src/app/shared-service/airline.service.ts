import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Airline} from '../airline';
import {Destination} from '../Destination';
import {AirlineServiceModel} from '../airlineServiceModel';


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

  getDestinations(airlineId: number): Observable<Destination[]> {
    return this.http.get<Destination[]>('http://localhost:8090/api/airlines/' + airlineId + '/getAllDestinations');
  }

  getServices(airlineId: number) {
    return this.http.get<AirlineServiceModel[]>('http://localhost:8090/api/airlines/' + airlineId + '/getAllServices');
  }

  getOneService(serviceId: number): Observable<AirlineServiceModel> {
    return this.http.get<AirlineServiceModel>('http://localhost:8090/api/airlines/' + serviceId + '/getOneService');
  }

  addService(id: number, service: AirlineServiceModel): Observable<any> {
    const sendService = JSON.stringify(service);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8090/api/airlines/' + id + '/addService', sendService, {headers: headers});
  }

  editService(serviceId: number, service: AirlineServiceModel) {
    const sendService = JSON.stringify(service);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8090/api/airlines/' + serviceId + '/updateService', sendService, {headers: headers});
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete('http://localhost:8090/api/airlines/' + id + '/deleteService');
  }

}
