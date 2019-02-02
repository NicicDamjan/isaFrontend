import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HotelServiceModel} from '../../hotel-service';
import { HotelService } from './../../shared-service/hotel.service';

@Component({
  selector: 'app-add-edit-hotel-service',
  templateUrl: './add-edit-hotel-service.component.html',
  styleUrls: ['./add-edit-hotel-service.component.css']
})

export class AddEditHotelServiceComponent implements OnInit {
  public form: FormGroup;
  public name: AbstractControl;
  public  cost: AbstractControl;
  private hotelId: number;
  private serviceId: number;
  private mode: string;

  constructor(protected  router: Router, private fb: FormBuilder,
              private route: ActivatedRoute, private service: HotelService) {
    this.form  = this.fb.group({
      'name': ['',  Validators.compose([Validators.required])],
      'cost': ['',  Validators.compose([Validators.required])],

    });
    this.name = this.form.controls['name'];
    this.cost = this.form.controls['cost'];
  }

  ngOnInit() {
    this.hotelId = this.route.snapshot.params.id;
    this.mode = this.route.snapshot.params.mode;

    if (this.mode == 'edit') {
      this.serviceId = this.route.snapshot.params.serviceId;
      this.service.getHotelService(this.hotelId, this.serviceId).subscribe(
        res => {
          this.form.controls['name'].setValue(res.name);
          this.form.controls['cost'].setValue(res.cost);

        }
      );

    }

  }

  execute() {
    if (this.mode == 'edit') {
      this.edit();
    } else {
      this.new();
    }
  }

  exit() {
    this.router.navigateByUrl('hotels/' + this.hotelId + '/services');
  }
  edit() {
    const hs = new HotelServiceModel();
    this.serviceId = this.route.snapshot.params.serviceId;
    hs.id = this.serviceId;
    hs.name = this.name.value;
    hs.cost = this.cost.value;

    this.service.editHotelService(hs, this.hotelId, this.serviceId).subscribe(
      res => {
        if (res != true) {
          alert('Doslo je do greske');
        }
        this.router.navigateByUrl('hotels/' + this.hotelId + '/services');
      },
      error1 => {
        alert('Doslo je do greske');
      }
    );

  }

  new() {
    const hs = new HotelServiceModel();
    hs.name = this.name.value;
    hs.cost = this.cost.value;
    this.service.addNewHotelService(hs, this.hotelId).subscribe(
      res => {
        this.router.navigateByUrl('hotels/' + this.hotelId + '/services');
      },
      error1 => {
        alert('Doslo je do greske');
      }
    );
  }
}

