import { RoomService } from './../../shared-service/room.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Room} from '../../Room';

@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  styleUrls: ['./add-edit-room.component.css']
})
export class AddEditRoomComponent implements OnInit {

  public form: FormGroup;
  public costPerNight: AbstractControl;
  public capacity: AbstractControl;
  public floor: AbstractControl;
  public hasBalcony: AbstractControl;
  public roomType: AbstractControl;
  public costValidFrom: AbstractControl;
  public costValidUntil: AbstractControl;


  private hotelId: number;
  private mode: string;
  public  rooms = [
    'Jednokrevetna',
    'Dvokrevetna',
     'Trokrevetna',
   'Četvorokrevetna',
  ];

  constructor(protected router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute, private roomService: RoomService) {

    this.form = this.fb.group({
      'costPerNight': ['', Validators.compose([Validators.required])],
      'capacity': ['', Validators.compose([Validators.required])],
      'floor': ['', Validators.compose([Validators.required])],
      'roomType': ['', Validators.compose([Validators.required])],
      'hasBalcony': [''],
      'costValidFrom': ['', Validators.compose([Validators.required])],
      'costValidUntil': ['', Validators.compose([Validators.required])]
    });
    this.costPerNight = this.form.controls['costPerNight'];
    this.capacity = this.form.controls['capacity'];
    this.floor = this.form.controls['floor'];
    this.roomType = this.form.controls['roomType'];
    this.hasBalcony = this.form.controls['hasBalcony'];
    this.costValidUntil = this.form.controls['costValidUntil'];
    this.costValidFrom = this.form.controls['costValidFrom'];
  }

  ngOnInit() {
     this.mode = this.route.snapshot.params.mode;
     this.hotelId = this.route.snapshot.params.id;
     if (this.mode == 'edit') {
         const roomId = this.route.snapshot.params.roomId;
         this.roomService.getRoom(roomId).subscribe(
           res => {
             this.form.controls['costPerNight'].setValue(res.costPerNight);
             this.form.controls['capacity'].setValue(res.capacity);
             this.form.controls['floor'].setValue(res.floor);
             this.form.controls['roomType'].setValue(res.roomType);
             this.form.controls['hasBalcony'].setValue(res.hasBalcony);
             this.form.controls['costValidFrom'].setValue(res.costValidFrom);
             this.form.controls['costValidUntil'].setValue(res.costValidUntil);

           }
         );

     }

  }

  execute() {
    if (this.mode == 'edit') {
      this.editRoom();
    } else {
      this.newRoom();
    }
  }

  exit() {
    this.router.navigateByUrl('hotels/' + this.hotelId + '/rooms');
  }

  editRoom() {
    const room = new  Room(this.costPerNight.value, this.capacity.value, this.floor.value, this.hasBalcony.value, this.roomType.value);
    const a = this.costValidFrom.value.toString().split('T');
    const b = a[0];

    const c = this.costValidUntil.value.toString().split('T');
    const d = c[0];

    const cenaOd = new Date(b);
    const cenaDo = new Date(d);
    const  id = this.route.snapshot.params.roomId;
    room.costValidFrom = cenaOd;
    room.costValidUntil = cenaDo;

    this.roomService.editRoom(room, id).subscribe(
      res => {
        this.router.navigateByUrl('hotels/' + this.hotelId + '/rooms');
      },
      error1 => {
        alert('Desila se greska!');
      }
    );
  }

  newRoom() {
    const room = new  Room(this.costPerNight.value, this.capacity.value, this.floor.value, this.hasBalcony.value, this.roomType.value);
    room.reserved = false;
    room.hotelId = this.hotelId;
    const a = this.costValidFrom.value.toString().split('T');
    const b = a[0];

    const c = this.costValidUntil.value.toString().split('T');
    const d = c[0];

    const cenaOd = new Date(b);
    const cenaDo = new Date(d);
    const  id = this.route.snapshot.params.roomId;
    room.costValidFrom = cenaOd;
    room.costValidUntil = cenaDo;

    this.roomService.addNewRoom(room, this.hotelId).subscribe(
      res => {
        this.router.navigateByUrl('hotels/' + this.hotelId + '/rooms');
      },
      error1 => {
        alert('Desila se greska!');
      }
    );
  }
}
