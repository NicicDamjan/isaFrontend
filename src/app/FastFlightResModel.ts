import {Seat} from './seat';
import {Flight} from './flight';

export class FastFlightResModel {

  public id: number;
  public flight: Flight;
  public seat: Seat;
  public price: number;
  public finalPrice: number;
  public discount: number;

}
