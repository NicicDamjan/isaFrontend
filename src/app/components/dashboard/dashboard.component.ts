import { Component, OnInit } from '@angular/core';
import {UserService} from'../../shared-service/user.service';
import {User} from '../../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _userService:UserService) { }

  ngOnInit() {
  }


  

}
