import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {Hotel} from '../../hotel';
import { HotelService } from './../../shared-service/hotel.service';
import {UserService} from '../../shared-service/user.service';
import {User} from '../../user';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {

  public form: FormGroup;
  public users: any;

  constructor(private hotelService: HotelService, private _userService: UserService) { }

  ngOnInit() {



    this._userService.getUsers().subscribe((data)=>{this.users=data.users;


    } );




    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      address: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('',[Validators.required]),
      admin: new FormControl("",[Validators.required]),
  })
  }

  addTheatreForm(){
    let hotelfields = this.form.value;

    this.hotelService.addHotel(hotelfields);
  }


}

