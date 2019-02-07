import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AirlineService} from '../../shared-service/airline.service';
import {FastFlightReservationsService} from '../../shared-service/fast-flight-reservations.service';
import {FastFlightResModel} from '../../FastFlightResModel';
import {Airline} from '../../airline';
import {Seat} from '../../seat';
import {Flight} from '../../flight';
import {FlightService} from '../../shared-service/flight.service';
import {SeatService} from '../../shared-service/seat-service.service';

@Component({
  selector: 'app-fast-flight-reservations',
  templateUrl: './fast-flight-reservations.component.html',
  styleUrls: ['./fast-flight-reservations.component.css']
})
export class FastFlightReservationsComponent implements OnInit {

  fastModel: FastFlightResModel[];
  airlineId: number;
  airline: Airline;
  showAirline: boolean = false;

  constructor(private route: ActivatedRoute, private seatData: SeatService, private destFlightData: FastFlightReservationsService, private fb: FormBuilder, private airlineService: AirlineService, private router: Router) { }

  ngOnInit() {

    this.airlineId = this.route.snapshot.params.id;


    this.destFlightData.getFastTickets(this.airlineId).subscribe(destFlightData => {
        this.fastModel = destFlightData;

      }
    );

    this.airlineService.getAirline(this.airlineId).subscribe(airlineService => {
      this.airline = airlineService;
      this.showAirline = true;
    } );

  }

  generate(num: number) {
    let n = num.toFixed(2);
    let s = n.toString();
    let parts = s.split('.');
    return parts[1];
  }

  getCurrentSeat(flight: Flight, seat: Seat) {

    let br = 0;

    for (let i = 0; i < flight.seats.length; i++) {

      if (flight.seats[i].id == seat.id) {

        br++;
        return br;

      } else {
        br++;
      }


    }
  }

  addTicket() {

    this.router.navigateByUrl('airlines/' + this.airlineId + '/fastFlightReservations/add');
  }

  reserve() {
  }

}
