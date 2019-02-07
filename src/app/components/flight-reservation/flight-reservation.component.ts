import { Component, OnInit } from '@angular/core';
import { AirlineService} from '../../shared-service/airline.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Airline} from '../../airline';
import {Destination} from '../../Destination';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FlightService} from '../../shared-service/flight.service';
import {Flight} from '../../flight';
import {SeatService} from '../../shared-service/seat-service.service';
import {fabric} from 'fabric';
import {AirlineConfiguration} from '../../airlineConfiguration';
import {Seat} from '../../seat';
//import {AccountService} from '../../shared-service/account.service';
import {FlightReservation} from '../../flightReservation';

@Component({
  selector: 'app-flight-reservation',
  templateUrl: './flight-reservation.component.html',
  styleUrls: ['./flight-reservation.component.css']
})
export class FlightReservationComponent implements OnInit {

  fr: number;
  airlines: Airline[];
  destinations: Destination[];
  form: FormGroup;

  list: Array<string> = new Array<string>();
  flights: Flight[];

  currentColor: string;
  j: number;
  brSlRed: number;
  brRaz: number;
  brPom2: number;
  brGR: number;
  flightId: number;
  airlineId: number;
  flight: Flight = new Flight();
  airline: Airline = new Airline();
  public airl = new AirlineConfiguration;
  seatGroups: any;
  seatColumns: any;
  seatRows: any;
  canvas: fabric.canvas;
  canvasSeats: fabric.canvas;
  private userLogged;


  a: string;
  b: string;

  brPom: number;

  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;

  map = new Map<number, number>();

  constructor(private data: FlightService, private fb: FormBuilder, /*private dataAccount: AccountService, */ private dataSeats: SeatService,  private dataAirline: AirlineService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.flightId = this.route.snapshot.params.flightId;

    this.airlineId = this.route.snapshot.params.id;

   // this.userLogged = this.dataAccount.getLoggedUser();

    this.data.getFlight(this.airlineId, this.flightId).subscribe(data => this.flight = data );

    this.dataAirline.getAirline(this.airlineId).subscribe(dataAirline => this.airline = dataAirline);

    this.dataAirline.getConfiguration(this.airlineId).subscribe(dataAirline => {

      this.airl = dataAirline;

      this.dataSeats.getSeats(this.flightId, this.airlineId).subscribe(dataSeats => {
        this.flight.seats = dataSeats;

        this.seatGroups = this.airl.arange as number;
        this.seatColumns = this.airl.columnsA as number;
        this.seatColumns = this.airl.columnsA as number;
        this.seatRows = this.airl.rowsA as number;

        this.canvasSeats = new fabric.Canvas('seatFree');

        this.canvasSeats.add(new fabric.Rect({
          left: 20,
          top: 20,
          fill: 'lightGreen',
          width: 25,
          height: 25,
          stroke: 'black'

        }));

        this.canvasSeats.add(new fabric.IText('  Slobodno', {
          left: 50,
          top: 23,
          fill: 'black',
          fontSize: 17
        }));

        this.canvasSeats.add(new fabric.Rect({
          left: 20,
          top: 50,
          fill: 'blue',
          width: 25,
          height: 25,
          stroke: 'black'

        }));

        this.canvasSeats.add(new fabric.IText('  Zauzeto', {
          left: 50,
          top: 53,
          fill: 'black',
          fontSize: 17
        }));

        this.canvasSeats.add(new fabric.Rect({
          left: 20,
          top: 80,
          fill: 'red',
          width: 25,
          height: 25,
          stroke: 'black'

        }));

        this.canvasSeats.add(new fabric.IText(' Selektovano', {
          left: 54,
          top: 83,
          fill: 'black',
          fontSize: 17
        }));


        this.canvasSeats.renderAll();


        this.canvas = new fabric.Canvas('c');

        this.drawSeats(this.flight);

        this.canvas.on('mouse:down', function(options) {

          // const btnName = options.target && options.target.name;
          console.log('usao');
          // if (btnName === 'group') {
          console.log('usaoovde');

          if (options.target.item(0).fill == 'lightGreen') {
            console.log('usaodabojicrveno');
            options.target.item(0).set({
              'fill': 'red'
            });

          } else if (options.target.item(0).fill == 'red')  {
            console.log('usaodabojizeleno');
            options.target.item(0).set({
              'fill': 'lightGreen'
            });

          }
          // }

        });

      });
    });


  }


  generate(num: number) {
    let n = num.toFixed(2);
    let s = n.toString();
    let parts = s.split('.');
    return parts[1];
  }

  Dalje1() {

    this.stepTwo = true;
    this.stepOne = false;

    //var div2 = document.getElementById('div2');

   // div2.scrollIntoView();

    var active = this.canvas.getObjects();
    // alert(active.length);

    let br = 0;

     for ( let i = 0; i < active.length; i++) {
        if (active[i].item(0).fill == 'red') {
          // alert(active[i].item(0).id);

          this.map.set( (i + 1), active[i].item(0).id);
        }
    }

    this.form = this.fb.group({});

    this.map.forEach((value: number, key: number) => {

      this.form.addControl('ime' + key,  this.fb.control('', Validators.compose([Validators.required])));
      this.form.addControl('prezime' + key,  this.fb.control('', Validators.compose([Validators.required])));
      this.form.addControl('pasos' + key,  this.fb.control('', Validators.compose([Validators.required])));
      // alert(key);
    });
  }

  Back1() {

    this.stepOne = true;
    this.stepTwo = false;

  }

  setData() {

    let m = this.map.keys().next().value;

      let c = 'ime' +  m;
      let d = 'prezime' + m;
      let e = 'pasos' + m;

      this.form.controls[c].setValue(this.userLogged.firstName);
      this.form.controls[d].setValue(this.userLogged.lastName);

  }


  drawSeats(flight: Flight) {


    this.brRaz = 0;
    this.brGR = 0;
    this.brPom = 0;
    this.brPom2 = 0;
    this.brSlRed = 0;
    this.j = 0;

    for (let i = 0; i < flight.seats.length; i++) {

      if (flight.seats[i].reserved == false) {
        this.currentColor = 'lightGreen';
      } else {
        this.currentColor = 'blue';
      }

      if (this.brPom == this.seatColumns) {
        this.j++;
        this.brPom2 += 30;
        this.brPom = 0;
        this.brSlRed++;
      } else {
        this.j++;
      }

      this.brPom++;

      if (this.brSlRed == this.seatGroups) {
        this.j = 1;
        this.brGR += 30;
        this.brSlRed = 0;
        this.brPom2 = 0;
      }

      const rec = new fabric.Rect({
        id: flight.seats[i].id,
        left: 20 + this.j * 30 + this.brPom2,
        top:  20 + this.brGR,
        fill: this.currentColor,
        width: 30,
        height: 30,
        stroke: 'black'
      });

      const text = new fabric.IText('' + (i + 1)  , {
        left: 20 + this.j * 30 + this.brPom2,
        top: 20 + this.brGR,
        fontSize: 18,
      });

      const group = new fabric.Group([ rec, text ], {
        id: flight.seats[i].id,
        left: 20 + this.j * 30 + this.brPom2,
        top: 20 + this.brGR,
        // angle: -10
      });

      group.hasBorders = group.hasControls = false;
      group.lockRotation = true;
      group.lockMovementX = true;
      group.lockMovementY = true;
      group.lockScalingX = group.lockScalingY = true;

      // group.set('selectable', false);
      group.set('name', 'group');

      this.canvas.add(group);
      this.canvas.renderAll();

      this.canvas.on('mouse:over', function(event) {
        if (event.target != null) {
          event.target.hoverCursor = 'pointer';
        }
      });

      this.canvas.setHeight(20 + this.brGR + 50);
      this.canvas.setWidth(20 + this.j * 30 + this.brPom2 + 50);


      // var div1 = document.getElementById('div1');

      // div1.style.height = 'auto';
      /*
                this.canvas.backgroundColor = 'red';


                div1.style.width = '20 + this.brGR + 200 px';
      */
    }

  }

  Dalje2() {

    this.stepTwo = false;
    this.stepThree = true;

    const send = new FlightReservation();

    send.username = this.userLogged.username;
    send.seatId = this.map.values().next().value;
    send.flightId = this.flightId;
    send.price = this.flight.ticketPrice;

    let m = this.map.keys().next().value;

    send.passport = this.form.get('pasos' + m).value;

    this.data.addFlightReservation(send).subscribe(data => {

        this.fr = data;
      }

    );

  }

  reserveHotel() {
    this.router.navigateByUrl('reservations/' + this.fr + '/hotels');
  }

  reserveRent(){
    this.router.navigateByUrl('reservations/' + this.fr + '/rent-a-cars');
  }

}
