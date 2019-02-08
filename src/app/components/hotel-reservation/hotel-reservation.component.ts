import { Component, OnInit } from '@angular/core';
import {Room} from './../../Room';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from './../../shared-service/room.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HotelReservation} from '../../hotel-reservation';
import {HotelServiceModel} from '../../hotel-service';
import {HotelService} from './../../shared-service/hotel.service';
import { FlightReservation } from '../../flightReservation';
import { FlightService } from './../../shared-service/flight.service';
import { AccountService } from './../../shared-service/account.service';
import { error } from 'util';
import {UserService} from './../../shared-service/user.service';
import {User} from '../../user';

@Component({
  selector: 'app-hotel-reservation',
  templateUrl: './hotel-reservation.component.html',
  styleUrls: ['./hotel-reservation.component.css']
})
export class HotelReservationComponent implements OnInit {

  public activeUser: User;
  rooms: Room[];
  items: HotelServiceModel[];
  hotelId: number;
  resId: number;
  totalRoomCost = 0;
  additionalServicesCost = 0;
  totalCost = 0;
  totalFlightCost = 0;
  isUslugeVisible = false;
  isBtnVisible = false;
  isSobeVisible = false;
  mozeDalje = true;
  rezervacijaTraje = true;
  rezervacijaGotova = false;
  flightReservation: FlightReservation;

  reservation: HotelReservation;
  private userLogged;
  public form: FormGroup;
  public checkInDate: AbstractControl;
  public checkOutDate: AbstractControl;

  constructor(private _userService: UserService,
              protected router: Router, private roomService: RoomService,
              private route: ActivatedRoute,  private servis: HotelService,
              private fb: FormBuilder,
              private flightService: FlightService,
              private accountService: AccountService) {

    this.form  = this.fb.group({
      'checkInDate':  ['',  Validators.compose([Validators.required])],
      'checkOutDate':  ['',  Validators.compose([Validators.required])]
    });
    this.checkInDate = this.form.controls['checkInDate'];
    this.checkOutDate = this.form.controls['checkOutDate'];
  }

  ngOnInit() {
    // 'reservations/hotel-reservation/:resId/:hotelId'
    this._userService.getActiveUser().subscribe((data) => {this.activeUser = data; });
    this.reservation = new HotelReservation();
    this.resId = this.route.snapshot.params.resId;
    this.hotelId = this.route.snapshot.params.hotelId;
    this.userLogged = this.accountService.getLoggedUser();
    this.flightService.getFlightReservationCost(this.resId).subscribe(
      res => {
        this.totalFlightCost = res;
        this.totalCost = this.totalCost + this.totalFlightCost;
      },
      error =>{
        console.log('Doslo je do greske.');
      }
    );
    // this.getRooms(this.hotelId);
    // this.getServices(this.hotelId);


  }

  getServices(id: number) {
    this.servis.getHotelServices(id).subscribe(
      res => {
        this.items = res;
        // alert(this.items.length);
        this.mozeDalje = true;
      },
      error1 => {
        alert('Doslo je do greske');
      }
    );
  }

  serachRooms() {
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

    this.roomService.getFreeRooms(this.hotelId, b1, d1).subscribe(
      res => {
        this.rooms = res;
        this.isSobeVisible = true;
        if ( this.rooms != undefined && this.rooms.length > 0) {
          this.getServices(this.hotelId);

        } else {
          this.mozeDalje = false;
        }
      },
      error => {
        alert('Doslo je do greske');
      }

    );

  }


  next() {

      this.reservation.hotelId = this.hotelId;

      const a = this.checkInDate.value.toString().split('T');
      const b = a[0];
      const c = this.checkOutDate.value.toString().split('T');
      const d = c[0];
      const dolazak = new Date(b);
      const odlazak = new Date(d);
      this.reservation.checkInDate = dolazak;
      this.reservation.checkOutDate = odlazak;

      this.reservation.numberOfNights = odlazak.getDate() - dolazak.getDate();
      //console.log('Broj nocenja izabrano: ' + this.reservation.numberOfNights);

      const selectedRooms = [];
      for (let i = 0; i < this.rooms.length; i++) {
        const element = <HTMLInputElement> document.getElementById(this.rooms[i].id.toString(10));
        if (element.checked) {
          selectedRooms.push(this.rooms[i].id);

          // this.totalRoomCost += this.rooms[i].costPerNight;
        }
      }
     // alert('Soba izabrano: ' + selectedRooms.length);
      this.reservation.rooms = selectedRooms;

      this.isSobeVisible = false;
      this.isUslugeVisible = true;
  }
  backToRooms() {
    // const elementSobe = <HTMLElement>document.getElementById('sobeTabela');
    // elementSobe.hidden = false;
    this.isSobeVisible = true;
    // const elementUsluge = <HTMLElement>document.getElementById('uslugeTabela');
    // elementUsluge.hidden = true;
    this.isUslugeVisible = false;
  }
  addServices() {
    // Selektovanje dodatnih hotelskih usluga
    const selectedServices = [];
    for (let i = 0; i < this.items.length; i++) {
      const element = <HTMLInputElement> document.getElementById(this.items[i].id.toString(10));
      if (element.checked) {
        selectedServices.push(this.items[i].id);
      }
    }
    this.reservation.extraServices = selectedServices;
    alert(this.reservation.extraServices.length);
    this.isBtnVisible = true;

  }


  serviceChanged(item: HotelServiceModel) {
    const element = <HTMLInputElement> document.getElementById(item.id.toString(10));
    if (element.checked) {
      this.additionalServicesCost += ( this.reservation.numberOfNights + 1) * item.cost;
      this.totalCost += ( this.reservation.numberOfNights + 1) * item.cost;
    } else {
      this.additionalServicesCost -= ( this.reservation.numberOfNights + 1) * item.cost;
      this.totalCost -= ( this.reservation.numberOfNights + 1) * item.cost;
    }

  }

  roomChanged(item: Room) {
    const element = <HTMLInputElement> document.getElementById(item.id.toString(10));
    if (element.checked) {
      this.totalRoomCost += this.reservation.numberOfNights * item.costPerNight;
      this.totalCost += this.reservation.numberOfNights * item.costPerNight;
    } else {
      this.totalRoomCost -= this.reservation.numberOfNights * item.costPerNight;
      this.totalCost -= this.reservation.numberOfNights * item.costPerNight;
    }
  }

  refresh() {
   this.checkInDate.reset();
   this.checkOutDate.reset();
   this.rooms = [];
   this.items = [];
   this.isSobeVisible = false;
   this.isUslugeVisible = false;
   this.isBtnVisible = false;

  }

  reserveFinally() {

    this.totalCost = this.additionalServicesCost + this.totalRoomCost;
    this.reservation.total = this.totalCost;
    this.reservation.username = this.userLogged.username;

      this.servis.reserveHotel(this.reservation, this.hotelId).subscribe(
        res => {
          this.rezervacijaTraje = false;
          this.rezervacijaGotova = true;
        },
        error1 => {
          alert('Doslo je do greske!');
        }
      );
  }

  index() {
    this.router.navigateByUrl('');
  }

  serachDiscountRooms() {
    this.router.navigateByUrl('reservations/hotel-reservation/' + this.resId + '/' + this.hotelId + '/rooms-on-discount');
  }
}
