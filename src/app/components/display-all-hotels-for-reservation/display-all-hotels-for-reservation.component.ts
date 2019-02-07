import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { HotelService } from './../../shared-service/hotel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-display-all-hotels-for-reservation',
  templateUrl: './display-all-hotels-for-reservation.component.html',
  styleUrls: ['./display-all-hotels-for-reservation.component.css']
})
export class DisplayAllHotelsForReservationComponent implements OnInit {

  list = [];
  orderBy: string;
  asc = true;
  searchText = '';
  resId: number;

  public form: FormGroup;
  public search: AbstractControl;
  public checkInDate: AbstractControl;
  public checkOutDate: AbstractControl;

  constructor( private  apiService:  HotelService, protected router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.form  = this.fb.group({
      'search': [],
      'checkInDate': [''],
      'checkOutDate': ['']
    });
    this.search = this.form.controls['search'];
    this.checkInDate = this.form.controls['checkInDate'];
    this.checkOutDate = this.form.controls['checkOutDate'];
  }

  ngOnInit() {
    this.resId = this.route.snapshot.params.id;
    alert( 'Id rezervacije: ' + this.resId);
    this.getHotels();
  }

  getHotels() {
    this.apiService.getHotelsByDestination(this.resId).subscribe(
      res => {
        this.list = res;
        // alert('Radi');
      },
      err => {
        alert('An error has occurred;');
      }

    );
  }


  sortHotelsDesc(s: string) {
      this.orderBy = s;
      this.asc = false;
      return false;
  }
  sortHotelsAsc(s: string) {
    this.orderBy = s;
    this.asc = true;
    return false;
  }

  serachHotels() {
    this.searchText = this.search.value;
  }

  refresh() {
    this.searchText = '';
    this.search.reset();
    this.checkInDate.reset();
    this.checkOutDate.reset();
    this.getHotels();
  }

  rezervisi(id: number) {
    alert('Hotel izabran: ' + id);
      this.router.navigateByUrl('reservations/hotel-reservation/' + this.resId  + '/' + id);
  }

}

