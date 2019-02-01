import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Airline} from './../../airline';
import { AirlineService } from './../../shared-service/airline.service';
import {ActivatedRoute,Router} from '@angular/router';


@Component({
  selector: 'app-airline-profile',
  templateUrl: './airline-profile.component.html',
  styleUrls: ['./airline-profile.component.css']
})
export class AirlineProfileComponent implements OnInit {


  public conf: boolean = false;
  public addConf: boolean = true;

  public configId:number;

  id: number;

  airline: Airline = new Airline();

  configuration: any;
  public conf2: boolean = false;

  constructor(private data: AirlineService, private route: ActivatedRoute, protected router: Router) {

  }

  ngOnInit() {

    this.id = this.route.snapshot.params.id;
    this.configId = this.route.snapshot.params.confId;

    this.data.getAirline(this.id).subscribe(
      data => this.airline = data
    );

  }

  details() {
    this.router.navigateByUrl('airlines/' + this.id + '/flights');
  }

  destinationsDetails() {
    this.router.navigateByUrl('airlines/' + this.id + '/destinations');
  }

  showServices() {
    this.router.navigateByUrl('airlines/' + this.id + '/services');
  }

  addConfiguration() {
    this.router.navigateByUrl('airlines/' + this.id + '/configuration/add');

  }

  showConfiguration() {
    this.conf = !this.conf;

    if (this.airline.airlineConfiguration == null) {
      this.conf2 = false;
      this.addConf = true;

    } else if (this.airline.airlineConfiguration != null){
      this.conf2 = true;
      this.addConf = false;
    }

  }

  changeConfiguration() {


    this.router.navigateByUrl('airlines/' + this.id + '/configuration/edit/' + this.airline.airlineConfiguration.id);

  }

}
