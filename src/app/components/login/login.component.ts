import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import { UserService } from '../../shared-service/user.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;



  constructor(private _userService:UserService,private _router: Router) {

   }

  ngOnInit() {

      this.form = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password1: new FormControl('', [Validators.required]),
  })

  }

  loginForm(){
    let loginfields = this.form.value;
    console.log("stigao login");
    this._userService.loginUser(loginfields).subscribe(
      (data:any)=>{
        if(data.role === "USER1"){
          alert('Zdravo Hotel Admine, ovo je tvoje prvo logovanje, moras da promenis sifru!');
          this._router.navigateByUrl("change-password");
        } else if (data.role != null ) {
          alert('Uspesno logovanje ' + data.email);
          window.location.reload(true);
          this._router.navigateByUrl("/");
        } else {
          alert('Logovanje nije uspesno!');
        }
       }
      );
  }




}
