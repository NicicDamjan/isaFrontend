import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AirlineService} from '../../shared-service/airline.service';
import {AirlineConfiguration} from '../../airlineConfiguration';
import {Flight} from '../../flight';
import {FlightService} from '../../shared-service/flight.service';

@Component({
  selector: 'app-add-fast-flight-reservation',
  templateUrl: './add-fast-flight-reservation.component.html',
  styleUrls: ['./add-fast-flight-reservation.component.css']
})
export class AddFastFlightReservationComponent implements OnInit {

  public form: FormGroup;
  public price: AbstractControl;
  public discount: AbstractControl;
  public flights: Flight[];

  private mode: string;
  private airlineId: number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private dataFlight: FlightService, private airlineService: AirlineService, private router: Router) { 

    this.form = this.fb.group({
      'price': ['', Validators.compose([Validators.required])],
      'discount': ['', Validators.compose([Validators.required])],
    });
    this.price = this.form.controls['price'];
    this.discount = this.form.controls['discount'];

  }

  ngOnInit() {

      // this.mode = this.route.snapshot.params.mode;

      this.airlineId = this.route.snapshot.params.id;

      this.dataFlight.getFlights(this.airlineId).subscribe(dataFlight => this.flights = dataFlight);
  /*
      if (this.mode == 'edit') {
        const id = this.route.snapshot.params.confId;
        this.airlineService.getConfiguration(id).subscribe(
          data => {
            this.form.controls['arange'].setValue(data.arange);
            this.form.controls['rowsA'].setValue(data.rowsA);
            this.form.controls['columnsA'].setValue(data.columnsA);
  
          }
        );
  
      }
      */
  }

  generate(num: number) {
    let n = num.toFixed(2);
    let s = n.toString();
    let parts = s.split('.');
    return parts[1];
  }


  addTicket(id: number) {

    this.router.navigateByUrl('airlines/' + this.airlineId + '/flights/' + id + '/addFastRes');

  }

}
