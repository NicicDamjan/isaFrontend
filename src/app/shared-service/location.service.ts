import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LocationService {
  url: string;
  constructor(private http: HttpClient) { }

  getCoordinates(addres: string[], city: string[], state: string[]): Observable<any> {
    this.url = 'http://open.mapquestapi.com/geocoding/v1/address?key=nb8I6ECYw2F34EQHjihc9G7Mr1fNyGsF&street=';
    for (let i = 0; i < addres.length; i++) {
      this.url += addres[i];
      // TODO Provjeri uslov!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if ( (addres.length - 1) != i) {
        this.url += '+';
      }
    }
    this.url += '&city=';
    for (let i = 0; i < city.length; i++) {
      this.url += city[i];
      if ( (city.length - 1) != i) {
        this.url += '+';
      }
    }
    this.url += '&state=';
    for (let i = 0; i < state.length; i++) {
      this.url += state[i];
      if ( (state.length - 1) != i) {
        this.url += '+';
      }
    }

     return this.http.get(this.url);
    // return this.http.get('http://open.mapquestapi.com/geocoding/v1/address?key=nb8I6ECYw2F34EQHjihc9G7Mr1fNyGsF&street=Alekse+Santica+4' +
    //  '&city=Novi+Sad&state=Serbia');
  }
}
