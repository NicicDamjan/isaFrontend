import {Destination} from './Destination';
import {FlightStops} from './flightStops';

export class Flight {

 public id: number;
 public duration: number;
 public landing: Date;
 public takeOff: Date;
 public stops: number;
 public fromDest: Destination;
 public toDest: Destination;
 public length: number;
 public ticketPrice: number;
 public flightStops: FlightStops[];
 public seatNumber: number;
}
