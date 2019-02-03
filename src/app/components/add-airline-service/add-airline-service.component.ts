import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AirlineServiceModel} from '../../airlineServiceModel';
import {AirlineService} from '../../shared-service/airline.service';

@Component({
  selector: 'app-add-airline-service',
  templateUrl: './add-airline-service.component.html',
  styleUrls: ['./add-airline-service.component.css']
})
export class AddAirlineServiceComponent implements OnInit {

  public form: FormGroup;
  public name: AbstractControl;
  public price: AbstractControl;

  private mode: string;
  private airlineId: number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private airlineService: AirlineService, private router: Router) { 
    
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'price': ['', Validators.compose([Validators.required])],
    });
    this.name = this.form.controls['name'];
    this.price = this.form.controls['price'];

  }

  ngOnInit() {

    this.mode = this.route.snapshot.params.mode;
    this.airlineId = this.route.snapshot.params.id;

    if (this.mode == 'edit') {
      const id = this.route.snapshot.params.serviceId;
      this.airlineService.getOneService(id).subscribe(
        data => {
          this.form.controls['name'].setValue(data.name);
          this.form.controls['price'].setValue(data.price);

        }
      );

    }

  }

  unesi() {
    if (this.mode == 'add'){
      this.newService();
    } else if (this.mode == 'edit') {
      this.editService();
    } else if(this.mode == 'delete'){
      this.deleteService();
    }
  }

  newService(): any {
    const service = new AirlineServiceModel();
    service.name = this.name.value;
    service.price = this.price.value;

    const  id = this.route.snapshot.params.serviceId;

    this.airlineService.addService(this.airlineId, service).subscribe( data =>
      this.router.navigateByUrl('airlines/' + this.airlineId + '/services'));
  }

  editService() {
    const service = new AirlineServiceModel();
    const  id = this.route.snapshot.params.serviceId;
    service.id = id;
    service.name = this.name.value;
    service.price = this.price.value;

    this.airlineService.editService(id, service).subscribe( data =>
      this.router.navigateByUrl('airlines/' + this.airlineId + '/services'));

  }

  private deleteService() {
    const  id = this.route.snapshot.params.serviceId;
    this.airlineService.deleteService(id).subscribe(data =>
      this.router.navigateByUrl('airlines/' + this.airlineId + '/services'));
  }



}
