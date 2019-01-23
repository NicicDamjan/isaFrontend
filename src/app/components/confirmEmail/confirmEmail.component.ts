import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import {UserService} from '../../shared-service/user.service';
import 'rxjs/add/operator/switchMap';
import { ParamMap } from '@angular/router';
@Component({
    selector: 'app-confirmEmail',
    templateUrl: './confirmEmail.component.html',
    styleUrls: ['./confirmEmail.component.css']
})
export class ConfirmEmail implements OnInit{
    private urlToken :String;

    constructor(private _userService:UserService ,private route: ActivatedRoute,private _router: Router) { }

  ngOnInit() {

    this.route.paramMap.switchMap((params: ParamMap) => {
        let user_token = params.get('token');
        console.log(user_token);
        this._userService.confirmEmail(user_token);
        this.urlToken=user_token;
       return user_token;
    })
    .subscribe(res => this.urlToken = res);



  }
}

