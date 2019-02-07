import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../shared-service/account.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  hotels = [];
  private userLogged;
  private temp = null;
  constructor(protected router: Router,
              private accountService: AccountService) {

  }

  ngOnInit() {

    this.userLogged =  this.accountService.getLoggedUser();
  }

  getAirlineList() {
    this.router.navigateByUrl('/airlines');
  }

  public  getAllHotels() {
    this.router.navigateByUrl('/hotels');
  }

}
