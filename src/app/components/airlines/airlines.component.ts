import { Component, OnInit } from '@angular/core';
import { AirlineService } from './../../shared-service/airline.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  
  airlines = [];

  constructor( private airlineService: AirlineService, protected router: Router) { }

  ngOnInit() {
    this.airlineService.getAirlines().subscribe(
      data => {
        this.airlines = data;
      }

    );
  }

 

 

}
