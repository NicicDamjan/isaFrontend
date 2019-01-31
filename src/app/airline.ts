import {Destination} from './Destination';
import {AirlineConfiguration} from './airlineConfiguration';

export class Airline {
  public id: number;
  public name: string;
  public address: string;
  public description: string;
  public destinations: Destination[];
  public airlineConfiguration: AirlineConfiguration;

}