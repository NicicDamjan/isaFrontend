import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HotelService } from './../../shared-service/hotel.service';
import {Hotel} from '../../hotel';
import {UserService} from './../../shared-service/user.service';
import {User} from '../../user';

@Component({
  selector: 'app-hotel-services',
  templateUrl: './hotel-services.component.html',
  styleUrls: ['./hotel-services.component.css']
})
export class HotelServicesComponent implements OnInit {

  items: HotelService[] = [];
  hotelId: number;
  public activeUser: User;
  public hotelAdmin: string;

  constructor(private _userService: UserService,
    protected router: Router, private route: ActivatedRoute, private hotelServis: HotelService) { }

  ngOnInit() {
    this._userService.getActiveUser().subscribe((data) => {this.activeUser = data; });
    this.hotelId = this.route.snapshot.params.id;
    this.getServices(this.hotelId);
    this.hotelServis.getHotel(this.hotelId).subscribe(res => {this.hotelAdmin = res.admin; });
  }

  getServices(id: number) {
    this.hotelServis.getHotelServices(id).subscribe(
      res => {
        this.items = res;
      },
      error1 => {
        alert('Doslo je do greske');
      }
    );
  }

  deleteService(id: number) {
    this.hotelServis.deleteHotelService(this.hotelId, id).subscribe(
      res => {
        this.ngOnInit();
      },
      error1 => {
        alert('Desila se greska!');
      }
    );
  }
  addHotelService() {
    this.router.navigateByUrl('hotels/' + this.hotelId + '/services/add');
  }

  editHotelService(id: number) {
    this.router.navigateByUrl('hotels/' + this.hotelId + '/services/edit/' + id);
  }

  back() {
    this.router.navigateByUrl('hotels/' + this.hotelId);
  }
}
