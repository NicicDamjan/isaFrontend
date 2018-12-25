import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'isaFrontend';

  objekat = {};
  constructor(private userService: UserService) {

  }

  ngOnInit() {
   /* this.userService.get().toPromise().then(data => {
      console.log('kao tu sam');
      this.objekat = data});*/
  }

}
