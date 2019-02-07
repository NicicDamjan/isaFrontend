import { Component, OnInit } from '@angular/core';
import {FlightService} from '../../shared-service/flight.service';
import {AirlineService} from '../../shared-service/airline.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Flight} from '../../flight';
import {Airline} from '../../airline';
import {fabric} from 'fabric';
import {AirlineConfiguration} from '../../airlineConfiguration';

@Component({
  selector: 'app-flight-profile',
  templateUrl: './flight-profile.component.html',
  styleUrls: ['./flight-profile.component.css']
})
export class FlightProfileComponent implements OnInit {

  flightId: number;
  airlineId: number;
  flight: Flight = new Flight();
  airline: Airline = new Airline();
  public airl = new AirlineConfiguration;
  seatGroups: any;
  seatColumns: any;
  seatRows: any;
  show: boolean = false;
  showThis: any;

  constructor(private data: FlightService, private dataAirline: AirlineService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.flightId = this.route.snapshot.params.flightId;

    this.airlineId = this.route.snapshot.params.id;

    this.data.getFlight(this.airlineId, this.flightId).subscribe(data => this.flight = data );

    this.dataAirline.getConfiguration(this.airlineId).subscribe(dataAirline => this.airl = dataAirline);

    this.seatGroups = this.airl.arange as number;
    this.seatColumns = this.airl.columnsA as number;
    this.seatRows = this.airl.rowsA as number;



    const canvas = new fabric.Canvas('c');

    for (let i = 1; i <= 5; i++) {

      const rec = new fabric.Rect({
        id: i,
        left: 20 + i * 30,
        top:  20,
        fill: 'lightGreen',
        width: 23,
        height: 23,
        stroke: 'black'
      });

      const text = new fabric.Text('' + i, {left: 20 + i * 30, top: 20, fontSize: 20, });

      const group = new fabric.Group([ rec, text ], {
        left: 20 + i * 30,
        top: 20,
        // angle: -10
      });



      canvas.add(group);
      canvas.renderAll();
    }

/*
// create a rectangle object
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: 'red',
      width: 50,
      height: 50
    });

   // rect.animate('left', '+=100', { onChange: canvas.renderAll.bind(canvas) });
// "add" rectangle onto canvas

    rect.hasBorders = false;
    rect.lockRotation = true;
  //  rect.lockMovementX = true;
    //rect.lockMovementY = true;
   // rect.lockScalingX = rect.lockScalingY = true;

    canvas.

      canvas.observe('mouse:over', function (e) {

          e.target.hoverCursor = 'pointer';


      });

   //rect.hasControls = rect.hasBorders = false;


    canvas.add(rect);
    */

  }

  counter(i: number) {
    return new Array(i);
  }


  method() {


  }



}
