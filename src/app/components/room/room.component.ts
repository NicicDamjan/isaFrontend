import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../shared-service/room.service';
import {Room} from '../../Room';
import {UserService} from './../../shared-service/user.service';
import {User} from '../../user';
import { HotelService } from './../../shared-service/hotel.service';

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

  constructor(private _userService: UserService, private hotelServis: HotelService,
    protected router: Router, private roomService: RoomService,  private route: ActivatedRoute) { }

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

}

