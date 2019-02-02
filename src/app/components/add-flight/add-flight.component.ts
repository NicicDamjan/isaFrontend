import { Component, OnInit } from '@angular/core';
import {AirlineService} from '../../shared-service/airline.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlightService} from '../../shared-service/flight.service';
import {Flight} from '../../flight';
import {Destination} from '../../Destination';
import {AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {group} from '@angular/animations';
import {FlightStops} from '../../flightStops';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  form: FormGroup;
  form2: FormGroup;
  id: number;
  cena: any;
  flight: Flight;
  destinations: Destination[];
  karta: AbstractControl;
  duzinaLeta: AbstractControl;
  minuti: AbstractControl;
  polazno: AbstractControl;
  odrediste: AbstractControl;
  datumPoletanja: AbstractControl;
  datumSletanja: AbstractControl;
  sati: AbstractControl;
  brPresedanja: AbstractControl;
  sedista: AbstractControl;
  show: boolean = false;
  num: number;
  bbr: any;
  bbr$: number;
  presedanja: FlightStops[] = [];
  public arr = new Array(0);

  constructor(protected router: Router, private dataA: AirlineService, private fb: FormBuilder, private dataF: FlightService, private route: ActivatedRoute) { 
   
    this.form = this.fb.group({
      'datumPoletanja': ['', Validators.compose([Validators.required])],
      'datumSletanja': ['', Validators.compose([Validators.required])],
      'sati': ['', Validators.compose([Validators.required])],
      'brPresedanja': ['', Validators.compose([Validators.required])],
      'minuti': ['', Validators.compose([Validators.required])],
      'polazno': ['', Validators.compose([Validators.required])],
      'odrediste': ['', Validators.compose([Validators.required])],
      'karta': ['', Validators.compose([Validators.required])],
      'duzinaLeta': ['', Validators.compose([Validators.required])],
      'sedista' : ['', Validators.compose([Validators.required])]
    });


    this.duzinaLeta = this.form.controls['duzinaLeta'];
    this.datumPoletanja = this.form.controls['datumPoletanja'];
    this.datumSletanja = this.form.controls['datumSletanja'];
    this.sati = this.form.controls['sati'];
    this.minuti = this.form.controls['minuti'];
    this.polazno = this.form.controls['polazno'];
    this.odrediste = this.form.controls['odrediste'];
    this.karta = this.form.controls['karta'];
    this.brPresedanja = this.form.controls['brPresedanja'];
    this.sedista = this.form.controls['sedista']
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params.id);
    this.dataA.getDestinations(this.id).subscribe(
      dataA => this.destinations = dataA
    );
  }
  
  newFlight(): any {
    //  const flight = new Flight();


    const t = parseInt(this.sati.value);
    const vreme = t + this.minuti.value;

    const a = this.datumPoletanja.value.toString().split('T');
    const b = a[0] + ' ' + a[1];

    const c = this.datumSletanja.value.toString().split('T');
    const d = c[0] + ' ' + c[1];

    const takeOff = new Date(b);
    const landing = new Date(d);

    this.flight = new Flight();

    this.flight.fromDest = this.polazno.value;
    this.flight.toDest = this.odrediste.value;
    this.flight.duration = vreme;
    this.flight.length = this.duzinaLeta.value;
    this.flight.landing = landing;
    this.flight.takeOff = takeOff;
    this.flight.stops = this.brPresedanja.value;
    this.flight.ticketPrice = this.karta.value;
    this.flight.stops = this.brPresedanja.value;
    this.flight.seatNumber = this.sedista.value;

    for (let i = 1; i <= this.bbr; i++) {

        const fs = new FlightStops();
        fs.dest = new Destination();
        fs.dest.name = this.form2.get('lokacija' + i).value;
        fs.dateTakeOff = this.form2.get('poletanje' + i).value;
        fs.dateStop = this.form2.get('sletanje' + i).value;

        this.presedanja.push(fs);

    }

    this.flight.flightStops = this.presedanja;

    this.dataF.addFlight(this.id, this.flight).subscribe(dataF =>
      this.router.navigateByUrl('/airlines/' + this.id + '/flights'));
  }

  unesi() {

    this.newFlight();
  }


  meth() {

    //  alert(new Array(this.bbr));
    this.show = true;

    this.arr = new Array(0);

    this.form2 = this.fb.group({});


    for (let i = 1; i <= this.bbr; i++) {
      this.form2.addControl('poletanje' + i,  this.fb.control('', Validators.compose([Validators.required])));
      this.form2.addControl('sletanje' + i,  this.fb.control('', Validators.compose([Validators.required])));
      this.form2.addControl('lokacija' + i,  this.fb.control('', Validators.compose([Validators.required])));

      this.arr.push(i);
    }

  }

}
