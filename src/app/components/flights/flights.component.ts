import { Component, OnInit } from '@angular/core';
import {Flight} from '../../flight';
import {ActivatedRoute, Router} from '@angular/router';
import {FlightService} from '../../shared-service/flight.service';
import {assertNumber} from '@angular/core/src/render3/assert';
import {AirlineService} from '../../shared-service/airline.service';
import {Airline} from '../../airline';
import {FlightStops} from '../../flightStops';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  id: number;
  flights: Flight[] = [];
  airline: Airline = new Airline();
  showStops: boolean = false;
  flightStops: FlightStops[] = [];

  constructor(private data: FlightService, private airlineData: AirlineService, private route: ActivatedRoute, protected router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => this.id = params.id);

    this.data.getFlights(this.id).subscribe(
      data => this.flights = data
    );

    this.airlineData.getAirline(this.id).subscribe(
      airlineData => this.airline = airlineData);


  }


generate(num: number) {
  let n = num.toFixed(2);
  let s = n.toString();
  let parts = s.split('.');
  return parts[1];
}

addFlight(id: number) {
  this.router.navigateByUrl('airlines/' + id + '/flights/addFlight');
}


izmeni() {

}

obrisi() {

}

details(flightId: number) {
  this.router.navigateByUrl('airlines/' + this.id + '/flights/' + flightId);
}



}
