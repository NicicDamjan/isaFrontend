import { Component, OnInit } from '@angular/core';
import {AirlineService} from '../../shared-service/airline.service';
import {DestinationService} from '../../shared-service/destination.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Destination} from '../../Destination';
import {Airline} from '../../airline';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  airlineID: number;
  destinations: Destination[] =[];
  airline: Airline = new Airline();

  constructor(private data: DestinationService, private airlineData: AirlineService, private route: ActivatedRoute, protected router: Router) { }

  ngOnInit() {

    this.airlineID = this.route.snapshot.params.id;

    this.data.getDestinations(this.airlineID).subscribe(data => this.destinations = data);

    this.airlineData.getAirline(this.airlineID).subscribe(airlineData => this.airline = airlineData);

  }

  back() {
    this.router.navigateByUrl('airlines/' + this.airlineID);
  }

  addDest() {
    this.router.navigateByUrl('airlines/' + this.airlineID + '/destinations/add');
  }
  editDest(id: number) {
    this.router.navigateByUrl('airlines/' + this.airlineID + '/destinations/edit/' + id);
  }
  obrisi(id: number) {
  }

}
