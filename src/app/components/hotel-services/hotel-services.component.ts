import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HotelService } from './../../shared-service/hotel.service';
import {Hotel} from '../../hotel';

@Component({
  selector: 'app-hotel-services',
  templateUrl: './hotel-services.component.html',
  styleUrls: ['./hotel-services.component.css']
})
export class HotelServicesComponent implements OnInit {

  items: HotelService[] = [];
  hotelId: number;

  constructor(protected router: Router, private route: ActivatedRoute, private hotelServis: HotelService) { }

  ngOnInit() {
    this.hotelId = this.route.snapshot.params.id;
    this.getServices(this.hotelId);
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
