import { Component } from "@angular/core";
import {UserService} from'../../shared-service/user.service';
import {User} from '../../user';
import { Router } from '@angular/router';


@Component({
    selector:'app-navbar',
    templateUrl:'./navbar.component.html',
    styleUrls:['./navbar.component.css']
})
export class NavbarComponent {

    public activeUser:User;

    constructor(private _userService:UserService,private _router: Router) {  }

    urlImg = '../../../assets/images/logo.png'

    ngOnInit() {

        this._userService.getActiveUser().subscribe((data)=>{this.activeUser=data;





        });
    }

    deleteActUser(){

        this._userService.deleteActiveUser();
        window.location.reload(true);
        this._router.navigateByUrl("/");
    }
}
