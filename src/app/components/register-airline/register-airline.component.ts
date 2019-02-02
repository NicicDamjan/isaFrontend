import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Airline} from './../../airline';
import { AirlineService } from './../../shared-service/airline.service';

@Component({
  selector: 'app-register-airline',
  templateUrl: './register-airline.component.html',
  styleUrls: ['./register-airline.component.css']
})
export class RegisterAirlineComponent implements OnInit {

  public form: FormGroup;
  public name: AbstractControl;
  public  address: AbstractControl;
  public  description: AbstractControl;

  constructor(protected  router: Router, private fb: FormBuilder,
              private route: ActivatedRoute, private service: AirlineService) {

                this.form  = this.fb.group({
                  'name': ['',  Validators.compose([Validators.required])],
                  'address': ['',  Validators.compose([Validators.required])],
                  'description': ['']
                });
            
                this.name = this.form.controls['name'];
                this.address = this.form.controls['address'];
                this.description = this.form.controls['description'];

                }

  ngOnInit() {
  }

  exit() {
    this.router.navigateByUrl('airlines');
  }

  execute() {
    const airline = new Airline();
    airline.name = this.name.value;
    airline.address = this.address.value;
    airline.description = this.description.value;
    airline.destinations = [];

  this.service.addNewAirline(airline).subscribe(
    res => {
      alert('Aviokompanija dodata');
      this.router.navigateByUrl('airlines');
    },
    error1 => {
      alert('Desila se greska');
    }
  );
  }

}
