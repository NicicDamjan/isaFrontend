import { HotelServiceModel } from './../hotel-service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hotel} from '../hotel';
import {HotelReservation} from '../hotel-reservation';
import { FastHotelReservation } from '../fastHotelRes';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable()
export class HotelService {

  private  BASE_URL = 'http://localhost:8090/api';
  private ALL_HOTELS_URL = this.BASE_URL + '/hotels';
  private hotel: Hotel;

  constructor(private http: HttpClient) { }

  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.ALL_HOTELS_URL);
  }

  getHotel( id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.ALL_HOTELS_URL}/` + id, httpOptions);
  }
  getHotelRating(id: number): Observable<any> {
    return this.http.get( `${this.BASE_URL}/ratings/averege-rating/` + id);
  }

  addNewHotel(hotel: Hotel) {
    const body = JSON.stringify(hotel);
    return this.http.post(`${this.BASE_URL}/system-admin/hotels`, body, httpOptions);
  }

  editHotel(id: number, hotel: Hotel): Observable<any> {
    const body = JSON.stringify(hotel);
    return this.http.put(`${this.ALL_HOTELS_URL}/` + id, body, httpOptions);
  }
  getHotelServices(id: number):  Observable<any> {
    return this.http.get(`${this.ALL_HOTELS_URL}/` + id +  '/services');
  }
  editHotelService(hs: HotelServiceModel, id: number, serviceId: number): Observable<any> {
    const body = JSON.stringify(hs);
    return this.http.put(`${this.ALL_HOTELS_URL}/` + id +  '/services/' + serviceId, body, httpOptions);
  }

  deleteHotelService(id: number, sId: number): Observable<any> {
    return this.http.delete(`${this.ALL_HOTELS_URL}/` + id +  '/services/' + sId);
  }

  addNewHotelService(hs: HotelServiceModel, id: number): Observable<any> {
    const body = JSON.stringify(hs);
    return this.http.post(`${this.ALL_HOTELS_URL}/` + id +  '/services', body, httpOptions);
  }

  getHotelService(hotelId: number, sId: number): Observable<any> {
      return this.http.get(`${this.ALL_HOTELS_URL}/` + hotelId + '/services/' + sId, httpOptions);
  }

  addHotel(h: any) {
    this.hotel = h;


    this.http.post('http://localhost:8090/hotel/registrationHotel',
      {
      name: this.hotel.name,
      address: this.hotel.address,
      description: this.hotel.description,
      city: this.hotel.city,
      country: this.hotel.country,
      admin: this.hotel.admin[0]

     })
      .subscribe(
      (data: any) => { }
      );


    }
    reserveHotel(reservation: HotelReservation, id: number): Observable<any> {
      const body = JSON.stringify(reservation);
      return this.http.post('http://localhost:8090/api/user/hotel-reservations/new', body, httpOptions);

    }

    getHotelsByDestination(resId: number): Observable<any> {
      return this.http.get(`${this.BASE_URL}/hotels-in/` + resId);
    }

    getExtraServicesOnDiscount(id: number): Observable<any> {
        return this.http.get(`${this.BASE_URL}/rooms-on-discount/` + id);
    }

    makeFastHotelReservation( reservation: FastHotelReservation): Observable<any> {
      const body = JSON.stringify(reservation);
      return this.http.post('http://localhost:8090/api/user/hotel-fast-reservations/new', body, httpOptions);

    }



}
