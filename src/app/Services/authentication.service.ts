import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl:string;
  url:string= '';
  gatewayBaseUrl:string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:27301/api/Auth/";
    this.gatewayBaseUrl = "http://localhost:5065/api/gateway/"
   }

   registerUser(username:string, password:string, email: string){
    this.url = this.gatewayBaseUrl+"Register";
    return this.http.post(this.url, {"userName":username, "password":password, "emailId": email}, {responseType: 'text'});
   }

   userLogin(username:string, password:string){
     this.url = this.gatewayBaseUrl+"Login";
     return this.http.post(this.url, {username, password});
   }
}
