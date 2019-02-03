import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AirlineService} from '../../shared-service/airline.service';
import {AirlineConfiguration} from '../../airlineConfiguration';

@Component({
  selector: 'app-add-airline-configuration',
  templateUrl: './add-airline-configuration.component.html',
  styleUrls: ['./add-airline-configuration.component.css']
})
export class AddAirlineConfigurationComponent implements OnInit {

  public form: FormGroup;
  public arange: AbstractControl;
  public rowsA: AbstractControl;
  public columnsA: AbstractControl;

  private mode: string;
  private airlineId: number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private airlineService: AirlineService, private router: Router) {

    this.form = this.fb.group({
      'arange': ['', Validators.compose([Validators.required])],
      'rowsA': ['', Validators.compose([Validators.required])],
      'columnsA': ['', Validators.compose([Validators.required])],
    });
    this.arange = this.form.controls['arange'];
    this.rowsA = this.form.controls['rowsA'];
    this.columnsA = this.form.controls['columnsA'];


   }

  ngOnInit() {

    this.mode = this.route.snapshot.params.mode;
    this.airlineId = this.route.snapshot.params.id;

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

  }

  unesi() {
    if (this.mode == 'add'){
      this.newConfiguration();
    } else if (this.mode == 'edit') {
      this.editConfiguration();
    } else if(this.mode == 'delete'){
   //   this.deleteConfiguration();
    }
  }

  newConfiguration(): any {
    const conf = new AirlineConfiguration();
    conf.arange = this.arange.value;
    conf.rowsA = this.rowsA.value;
    conf.columnsA = this.columnsA.value;

    this.airlineService.addConfiguration(this.airlineId, conf).subscribe( data =>
      this.router.navigateByUrl('airlines/' + this.airlineId));
  }

  editConfiguration() {
    const conf = new AirlineConfiguration();
    const  id = this.route.snapshot.params.confId;
    conf.id = id;
    conf.arange = this.arange.value;
    conf.rowsA = this.rowsA.value;
    conf.columnsA = this.columnsA.value;

    this.airlineService.editConfiguration(id, conf).subscribe( data =>
      this.router.navigateByUrl('airlines/' + this.airlineId));

  }
/*
  private deleteConfiguration() {
    const  id = this.route.snapshot.params.serviceId;
    this.airlineService.deleteService(id).subscribe(data =>
      this.router.navigateByUrl('airlines/' + this.airlineId + '/services'));
  }
  */
 
}
