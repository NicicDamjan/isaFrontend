import { Component } from "@angular/core";
import {User} from '../../user';
import { RouterModule, Routes,Router } from '@angular/router';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {UserService} from'../../shared-service/user.service';
import {FriendsService} from'../../shared-service/friends.service';


@Component({
    selector:'app-userAccount',
    templateUrl:'./userAccount.component.html',
    styleUrls:['./userAccount.component.css']

})
export class UserAccount {
    private user:User;
    private activeUser:User;

    userF: User;
    friendships: any[];
    frinedship: any;
    friendss: any[];

    constructor(private _userService:UserService,private _friendsService:FriendsService,route: ActivatedRoute) {  }

    ngOnInit() {
        this._userService.getUser().subscribe((data)=>this.user=data) ;
        this._userService.getActiveUser().subscribe((data)=>{this.activeUser=data; });//this.initFriends();

    }

    initFriends(){

        this._friendsService.getRequests(this.activeUser.id)
        .subscribe(data => { this.friendships = data
            console.log(data);
        });

        this._friendsService.getFriends(this.activeUser.id)
        .subscribe(data =>{ this.friendss = data;
          console.log(data);
        });

    }

    acceptFriend(idfs): void{

        this._friendsService.acceptRequest(idfs)
        .subscribe(data => this.frinedship = data);
        location.reload();
      }

      declineFriend(idfs): void{

        this._friendsService.declineRequest(idfs)
        .subscribe(data => this.frinedship = data);
        location.reload();
      }




      myFunction() {
           console.log("Prosaoo jeee");
        var input, filter, table, tr, td, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }
}
