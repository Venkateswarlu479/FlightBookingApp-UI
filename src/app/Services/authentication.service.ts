import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl:string;
  url:string= '';

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:27301/api/Auth/";
   }

   registerUser(username:string, password:string, email: string){
    this.url = this.baseUrl+"Register";
    return this.http.post(this.url, {"userName":username, "password":password, "email": email}, {responseType: 'text'});
   }

   userLogin(username:string, password:string){
     this.url = this.baseUrl+"Login";
     return this.http.post(this.url, {username, password});
   }

   getUsers(){
     const headers = new HttpHeaders({
       'Authorization': `bearer ${JSON.parse(JSON.stringify(localStorage.getItem("UserInfo")))?.Token}`
     });
   }
}
