import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FlightService} from '../../shared-service/flight.service';
import {SeatService} from '../../shared-service/seat-service.service';

@Component({
  selector: 'app-add-seats',
  templateUrl: './add-seats.component.html',
  styleUrls: ['./add-seats.component.css']
})
export class AddSeatsComponent implements OnInit {

  public form: FormGroup;
  public seatNumber: AbstractControl;

  private airlineId: number;
  private flightId: number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private seatService: SeatService, private dataFlight: FlightService, private router: Router) {

    this.form = this.fb.group({
      'seatNumber': ['', Validators.compose([Validators.required])],
    });
    this.seatNumber = this.form.controls['seatNumber'];

   }

  ngOnInit() {

    this.airlineId = this.route.snapshot.params.id;
    this.flightId = this.route.snapshot.params.flightId;

  }

  unesi() {
    this.addSeats();

}

addSeats(): any {

  const num = this.seatNumber.value;

  this.seatService.addSeats(this.flightId, this.airlineId, num).subscribe( data =>
    this.router.navigateByUrl('airlines/' + this.airlineId + '/flights/' + this.flightId));
}

}
