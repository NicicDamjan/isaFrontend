import { HotelService } from './../../shared-service/hotel.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hotel} from '../../hotel';
import {forEach} from '@angular/router/src/utils/collection';
import {UserService} from './../../shared-service/user.service';
import {User} from '../../user';

@Component({
  selector: 'app-hotel-profile',
  templateUrl: './hotel-profile.component.html',
  styleUrls: ['./hotel-profile.component.css']
})
export class HotelProfileComponent implements OnInit {
  id: number;
  hotel: Hotel;
  pomAdresa: string[];
  pomGrad: string[];
  pomDrz: string[];
  public activeUser: User;

  constructor(private _userService: UserService,
    protected router: Router, private hotelService: HotelService, private route: ActivatedRoute) { }

  ngOnInit() {
    this._userService.getActiveUser().subscribe((data) => {this.activeUser = data; });
    this.id = this.route.snapshot.params.id;
    this.getHotel(this.id);
  }
  getHotel(id: number) {
    this.hotelService.getHotel(id).subscribe(
      res => {
        if (res) {
          this.hotel = res;
          this.pomAdresa = this.hotel.address.trim().split(' ');
          this.pomGrad = this.hotel.city.trim().split(' ');
          this.pomDrz = this.hotel.country.trim().split(' ');

           this.hotelService.getHotelRating(id).subscribe(
            data => {
              if (isNaN(data)) {
                this.hotel.avgRating = 0;
              } else {
              this.hotel.avgRating = data;

              }
            },
             error1 => {
               alert('Desila se greska!');
             }
          );
          // alert(res.name + res.address + res.avgRating);
        }
      },
      error1 => {
        alert('Desila se greska!');
      }
    );
  }

  displayRooms() {
    this.router.navigateByUrl('hotels/' + this.id + '/rooms');
  }
  displayServices() {
    this.router.navigateByUrl('hotels/' + this.id + '/services');
  }

  editHotel(id: number) {
    this.router.navigateByUrl('hotels/' + this.id + '/edit');
  }

  makeAReservation(id: number) {
    this.router.navigateByUrl('user/hotel-reservation/' + id);
  }
}
