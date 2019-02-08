import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../user';


import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';


import {HttpClient,HttpHeaders}from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserService {

  private baseUrl:string='http://localhost:8084/user';
  private user:User;
   constructor(private httpClient:HttpClient) {}


createUser(u:any) {

  this.user=u;
  const headers = new Headers({'Content-Type': 'application/json'});
  const body = JSON.stringify(this.user);
  console.log(this.user);
  this.httpClient.post('http://localhost:8090/user/registration',
  {name:this.user.name,
   surname:this.user.surname,
  email:this.user.email,
  password1:this.user.password1,
  password2:this.user.password2,
  phonenumber:this.user.phonenumber,
  city:this.user.city})
  .subscribe(
  (data:any)=>{ alert(data.message);}
  )
  }

  addAdmin(u:any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(this.user);
    console.log(this.user);
    this.httpClient.post('http://localhost:8090/user/addSysAdmin',
    {
    email: u ,
  })
    .subscribe(
    (data:any)=>{ alert(data.message);}
    )
    }

  editUser(u:any) {

    this.user=u;
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(this.user);
    console.log(this.user);
    this.httpClient.post('http://localhost:8090/user/edituser',
    {name:this.user.name,
     surname:this.user.surname,
    email:this.user.email,
    password1:this.user.password1,
    password2:this.user.password2,
    phonenumber:this.user.phonenumber,
    city:this.user.city})
    .subscribe(
    (data:any)=>{ alert(data.message);}
    )
    }

    changeAdminPassword(u:any){
      this.user=u;
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(this.user);
    console.log(this.user);
    this.httpClient.post('http://localhost:8090/user/returnUserRole',
    {
    password1:this.user.password1,
    password2:this.user.password2,
    })
    .subscribe(
    (data:any)=>{ alert(data.message);}
    )

    }

  confirmEmail(token:any){
    console.log('TOKEN:'+ token);
    this.httpClient.post('http://localhost:8090/user/confirmEmail?token='+token,{})
    .subscribe(
    (data:any)=>{  alert(data.message);}
    )
  }



  loginUser(u:any): Observable<any>  {
    this.user=u;
    const headers = new Headers({'Content-Type': 'application/json'});
    const body = JSON.stringify(this.user);
    console.log(this.user);
    return this.httpClient.post('http://localhost:8090/user/login',
    {email:this.user.email,
     password1:this.user.password1
    });
  }

  getUser(): Observable<any>{

    return this.httpClient.get('http://localhost:8080/user/getUser/1');

  }

  getActiveUser(): Observable<any>{

    return this.httpClient.get('http://localhost:8090/user/getActiveUser');

  }


 deleteActiveUser(){

  return this.httpClient.get('http://localhost:8090/user/deleteActiveUser').subscribe( data=>{

  })

}

getUsers(): Observable<any>{

  return this.httpClient.get('http://localhost:8090/user/getUsers');

}


}
