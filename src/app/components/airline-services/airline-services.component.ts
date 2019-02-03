import { Component, OnInit } from '@angular/core';
import {AirlineService} from '../../shared-service/airline.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AirlineServiceModel} from '../../airlineServiceModel';
import {Airline} from '../../airline';

@Component({
  selector: 'app-airline-services',
  templateUrl: './airline-services.component.html',
  styleUrls: ['./airline-services.component.css']
})
export class AirlineServicesComponent implements OnInit {

  id: number;
  services: AirlineServiceModel[] = [];
  airline: Airline = new Airline();

  constructor(private data: AirlineService, private serviceData: AirlineService, private route: ActivatedRoute, protected router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;

    this.serviceData.getAirline(this.id).subscribe(serviceData => this.airline = serviceData);

    this.serviceData.getServices(this.id).subscribe(serviceData => this.services = serviceData);

  }

  addService() {
    this.router.navigateByUrl('airlines/' + this.id + '/services/add');
  }

  back() {
    this.router.navigateByUrl('airlines/' + this.id);
  }

  editService(servid: number) {
    this.router.navigateByUrl('airlines/' + this.id + '/services/edit/' + servid);
  }

  deleteService(id: number) {

    for (let i = 0; i < this.services.length; ++i){
      if (this.services[i].id === id) {
        this.services.splice(i,1);
      }
    }

    this.serviceData.deleteService(id).subscribe(serviceData => this.router.navigateByUrl('airlines/' + this.id + '/services'));


  }

}
