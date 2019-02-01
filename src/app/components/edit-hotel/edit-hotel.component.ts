import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Hotel} from '../../hotel';
import { HotelService } from './../../shared-service/hotel.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {

  public form: FormGroup;
  public name: AbstractControl;
  public  address: AbstractControl;
  public  description: AbstractControl;
  public country: AbstractControl;
  public  city: AbstractControl;

  private hotelId: number;
  private mode: string;

  constructor(protected  router: Router, private fb: FormBuilder,
    private route: ActivatedRoute, private service: HotelService) {

      this.form  = this.fb.group({
        'name': ['',  Validators.compose([Validators.required])],
        'address': ['',  Validators.compose([Validators.required])],
        'description': [''],
        'city': ['',  Validators.compose([Validators.required])],
        'country': ['',  Validators.compose([Validators.required])]
      });

     this.name = this.form.controls['name'];
     this.address = this.form.controls['address'];
     this.description = this.form.controls['description'];
     this.city = this.form.controls['city'];
     this.country = this.form.controls['country'];

     }


  ngOnInit() {
    this.mode = this.route.snapshot.params.mode;
    this.hotelId = this.route.snapshot.params.id;

      this.service.getHotel(this.hotelId).subscribe(
        res => {
          this.form.controls['name'].setValue(res.name);
          this.form.controls['address'].setValue(res.address);
          this.form.controls['description'].setValue(res.desc);
          this.form.controls['city'].setValue(res.city);
          this.form.controls['country'].setValue(res.country);
        }
      );


  }

  exit() {
    this.router.navigateByUrl('hotels');
  }

  execute() {
      const hotel = new Hotel();
      hotel.name = this.name.value;
      hotel.address = this.address.value;
      hotel.desc = this.description.value;
      hotel.city = this.city.value;
      hotel.country = this.country.value;

      this.service.editHotel( this.hotelId, hotel).subscribe(
        res => {
          alert('Hotel izmenjen');

          this.router.navigateByUrl('hotels');
        },
        error1 => {
          alert('Desila se greska');
        }
      );



  }

}
