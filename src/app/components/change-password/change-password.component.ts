import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import { UserService } from '../../shared-service/user.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public form: FormGroup;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.form = new FormGroup({
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),

  });

  }

  changePasswordForm(){
    let userfields = this.form.value;
    console.log("stigao do ovde menajnje sifre admina");
    this._userService.changeAdminPassword(userfields);
    window.location.reload(true);


}

}
