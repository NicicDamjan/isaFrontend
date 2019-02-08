import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared-service/user.service';
import {User} from '../../user';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  public form: FormGroup;
  public users: any;
  public newAdmin: User;

  constructor(private _userService: UserService,
    protected  router: Router) { }

  ngOnInit() {
    this._userService.getUsers().subscribe((data) => {this.users = data.users;
    } );

    this.form = new FormGroup({
      admin: new FormControl( "" , [Validators.required]),
  });


  }

  addAdmin() {

    console.log(this.form.value.admin[0]);
    this._userService.addAdmin(this.form.value.admin[0]);

    this.ngOnInit();

    window.location.reload(true);
  }

}
