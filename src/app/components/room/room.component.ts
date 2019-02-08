import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../shared-service/room.service';
import {Room} from '../../Room';
import {UserService} from './../../shared-service/user.service';
import {User} from '../../user';
import { HotelService } from './../../shared-service/hotel.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  rooms: Room[] = [];
  hotelId: number;
  public activeUser: User;
  public hotelAdmin: string;
  freeRooms: Room[] = [];
  public form: FormGroup;
  public dolazak: AbstractControl;
  public  odlazak: AbstractControl;


  constructor(private _userService: UserService, private hotelServis: HotelService,
    protected router: Router, private roomService: RoomService,  private route: ActivatedRoute, private fb: FormBuilder) {
      this.form  = this.fb.group({
        'dolazak': ['',  Validators.compose([Validators.required])],
        'odlazak': ['',  Validators.compose([Validators.required])]
      });

      this.dolazak = this.form.controls['dolazak'];
      this.odlazak = this.form.controls['odlazak'];
     }

  ngOnInit() {
    this.hotelId = this.route.snapshot.params.id;
    this.getRooms(this.hotelId);
    this._userService.getActiveUser().subscribe((data) => {this.activeUser = data; });
    this.hotelServis.getHotel(this.hotelId).subscribe(res => {this.hotelAdmin = res.admin; });

  }
  getRooms(id: number) {
    this.roomService.getAllRooms(id).subscribe(
      res => {
        if (res) {
          this.rooms = res;
        }
      },
      error1 => {
        alert('Desila se greska');
      }
    );
  }

  addNewRoom() {
    this.router.navigateByUrl('hotels/' + this.hotelId + '/rooms/add');
  }
  editRoom(id: number) {
    this.router.navigateByUrl('hotels/' + this.hotelId + '/rooms/edit/' + id);
  }

  deleteRoom(roomId: number) {
    this.roomService.deleteRoom(roomId).subscribe(
      res => {
          this.router.navigateByUrl('hotels/' + this.hotelId + '/rooms');
      },
      error1 => {
        alert('Desila se greska!');
      }
    );
  }

  execute() {
  /* let i = 0;
        for (i = 0; i < this.rooms.length; i++) {
            const r = this.rooms[i];
              if ( r.reserved == false
                || ( r.reservedFrom < this.dolazak.value  && r.reservedUntil < this.dolazak.value )
                ||  r.reservedFrom > this.odlazak.value && r.reservedUntil > this.odlazak.value
                ) {
                    this.freeRooms.push(this.rooms[i]);
              }
        }*/
        const a = this.dolazak.value.toString().split('T');
        const b = a[0];
        const c = this.odlazak.value.toString().split('T');
        const d = c[0];

        const pom = b.split('-');
        const b1 = pom[2] + '-' + pom[1] + '-' + pom[0];

        const pom2 = d.split('-');
        const d1 = pom2[2] + '-' + pom2[1] + '-' + pom2[0];
        this.roomService.getFreeRooms(this.hotelId, b1, d1).subscribe(
          res => {
            this.rooms = res;
          },
          error => {
            alert('Doslo je do greske');
          }

        );
  }

  refresh() {
      this.dolazak.reset();
      this.odlazak.reset();
      this.getRooms(this.hotelId);
  }

}
