import { Component, OnInit } from '@angular/core';
import { HotelService } from './../../shared-service/hotel.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'app-listhotel',
  templateUrl: './listhotel.component.html',
  styleUrls: ['./listhotel.component.css']
})
export class ListhotelComponent implements OnInit {

  hotels = [];
  orderBy: string;
  asc = true;
  searchText = '';

  public form: FormGroup;
  public search: AbstractControl;
  public checkInDate: AbstractControl;
  public checkOutDate: AbstractControl;

  constructor(
     private hotelService: HotelService, protected router: Router,
     private fb: FormBuilder) {


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
    this.getHotels();
  }

  getHotels() {
    this.hotelService.getAllHotels().subscribe(
      res => {
        this.hotels = res;
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
    this.checkInDate.reset();
    this.getHotels();
  }
}
