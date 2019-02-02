import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DestinationService} from '../../shared-service/destination.service';
import {Destination} from '../../Destination';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css']
})
export class AddDestinationComponent implements OnInit {

  public form: FormGroup;
  public name: AbstractControl;
  public nick: AbstractControl;
  public state: AbstractControl;
  public city: AbstractControl;

  private mode: string;
  private airlineId: number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private destService: DestinationService, private router: Router) {

    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'state': ['', Validators.compose([Validators.required])],
      'nick': ['', Validators.compose([Validators.required])],
    });
    this.name = this.form.controls['name'];
    this.city = this.form.controls['city'];
    this.nick = this.form.controls['nick'];
    this.state = this.form.controls['state'];

   }

  ngOnInit() {
    
    this.mode = this.route.snapshot.params.mode;
    this.airlineId = this.route.snapshot.params.id;

    if (this.mode == 'edit') {
      const destId = this.route.snapshot.params.destId;
      this.destService.getDestination(destId).subscribe(
        data => {
          this.form.controls['name'].setValue(data.name);
          this.form.controls['city'].setValue(data.city);
          this.form.controls['nick'].setValue(data.nick);
          this.form.controls['state'].setValue(data.state);

        }
      );

    }
  }

  unesi() {
    if(this.mode == 'add'){
      this.newDestination();
    } else if(this.mode == 'edit') {
      this.editDestination();
    }
  }

  newDestination(): any {
    const d = new Destination();
    d.name = this.name.value;
    d.nick = this.nick.value;
    d.state = this.state.value;
    d.city = this.city.value;

    const  id = this.route.snapshot.params.destId;

    this.destService.addDestination(this.airlineId, d).subscribe( data =>
    this.router.navigateByUrl('airlines/' + this.airlineId + '/destinations'));
  }

  editDestination(){
    const d = new Destination();
    const  id = this.route.snapshot.params.destId;
    d.id = id;
    d.name = this.name.value;
    d.nick = this.nick.value;
    d.state = this.state.value;
    d.city = this.city.value;

    this.destService.editDestination(id, d).subscribe( data =>
      this.router.navigateByUrl('airlines/' + this.airlineId + '/destinations'));

  }

}
