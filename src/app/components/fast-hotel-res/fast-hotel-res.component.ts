import { Component, OnInit } from '@angular/core';
import { RoomOnDiscount } from '../../roomOnDiscount';
import { HotelServiceModel } from './../../hotel-service';
import { FastHotelReservation } from './../../fastHotelRes';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from './../../shared-service/room.service';
import { FlightService } from './../../shared-service/flight.service';
//import { AccountService } from './../../shared-service/account.service';
import { HotelService } from './../../shared-service/hotel.service';

@Component({
  selector: 'app-fast-hotel-res',
  templateUrl: './fast-hotel-res.component.html',
  styleUrls: ['./fast-hotel-res.component.css']
})
export class FastHotelResComponent implements OnInit {

  rooms: RoomOnDiscount[];
  items: HotelServiceModel[];
  hotelId: number;
  resId: number;
  totalCost = 0;
  totalFlightCost = 0;
  isUslugeVisible = false;
  isSobeVisible = false;
  rezervacijaTraje = true;
  rezervacijaGotova = false;
  reservation: FastHotelReservation;
  private userLogged;
  public form: FormGroup;
  public checkInDate: AbstractControl;
  public checkOutDate: AbstractControl;

  constructor(protected router: Router, private roomService: RoomService,
    private route: ActivatedRoute,  private servis: HotelService,
    private fb: FormBuilder,
    private flightService: FlightService,
   // private accountService: AccountService
   ) {

this.form  = this.fb.group({
'checkInDate':  ['',  Validators.compose([Validators.required])],
'checkOutDate':  ['',  Validators.compose([Validators.required])]
});
this.checkInDate = this.form.controls['checkInDate'];
this.checkOutDate = this.form.controls['checkOutDate'];
}
  ngOnInit() {
    this.reservation = new FastHotelReservation();
    this.resId = this.route.snapshot.params.resId;
    this.hotelId = this.route.snapshot.params.hotelId;
   // this.userLogged = this.accountService.getLoggedUser();
    this.flightService.getFlightReservationCost(this.resId).subscribe(
      res => {
        this.totalFlightCost = res;
        this.totalCost = this.totalCost + this.totalFlightCost;
      },
      error => {
        console.log('Doslo je do greske.');
      }
    );
  }



  serachDiscountRooms() {
    const a = this.checkInDate.value.toString().split('T');
    const b = a[0];
    const c = this.checkOutDate.value.toString().split('T');
    const d = c[0];

    const pom = b.split('-');
    const b1 = pom[2] + '-' + pom[1] + '-' + pom[0];

    const pom2 = d.split('-');
    const d1 = pom2[2] + '-' + pom2[1] + '-' + pom2[0];

    if ( this.checkInDate.value > this.checkOutDate.value ) {
          alert('Molimo ponovo unesite datum dolaska i odlaska.');
          this.refresh();
          return;
    }
    const dolazak = new Date(b);
    const odlazak = new Date(d);
    this.reservation.checkInDate = dolazak;
    this.reservation.checkOutDate = odlazak;

    this.reservation.numberOfNights = odlazak.getDate() - dolazak.getDate();
    console.log('Broj nocenja izabrano: ' + this.reservation.numberOfNights);

    this.roomService.getFreeRoomsOnDiscount(this.hotelId, b1, d1).subscribe(
      res => {
        this.rooms = res;
        this.isSobeVisible = true;
      },
      error => {
        alert('Doslo je do greske');
      }

    );
  }

  refresh() {
    this.checkInDate.reset();
    this.checkOutDate.reset();
    this.rooms = [];
    this.items = [];
    this.isSobeVisible = false;
    this.isUslugeVisible = false;
   }
   prikaziUsluge(id: number) {

      this.servis.getExtraServicesOnDiscount(id).subscribe(
        res => {
              this.items = res;
              this.isUslugeVisible = true;
        },
        error => {
          console.log('Doslo je do greske.');
        }
      );
   }

   rezervisiSobu(room: RoomOnDiscount) {
      this.reservation.total = 0;
      this.reservation.room = room.id;
      this.reservation.hotelId = room.hotelId;
      this.reservation.username = this.userLogged.username;
      for (let i = 0; i < this.items.length; ++i) {
            this.reservation.extraServices.push(this.items[i].id);
            this.reservation.total = this.reservation.total + (this.reservation.numberOfNights + 1) * this.items[i].cost;
      }

      this.reservation.total = this.totalFlightCost + this.reservation.numberOfNights * room.costPerNight;

      this.servis.makeFastHotelReservation(this.reservation).subscribe(
        res => {
            this.rezervacijaTraje = false;
            this.rezervacijaGotova = true;
        },
        error => {
            alert('Doslo je do greske!');
        }
      );

   }

}
