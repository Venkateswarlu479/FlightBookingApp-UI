import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl:string;
  url:string= '';
  //private currentUserSubject: BehaviorSubject<User>;
  //private currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:27301/api/Auth/";
    //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(''));
    //this.currentUser = this.currentUserSubject.asObservable();
   }

  //  public get currentUserValue(): User{
  //    return this.currentUserSubject.value;
  //  }

   userLogin(username:string, password:string):Observable<string>{
     this.url = this.baseUrl+"Login";
     return this.http.post<string>(this.url, {username, password});
     //.pipe(map(user => {
       //store user info and JWT token in local storage
       //localStorage.setItem("currentUser", JSON.stringify(user));
       //this.currentUserSubject.next(user);
       //return user;
     //}));
   }

   setLocalStorage(token: string){
    localStorage.setItem("currentUser", token);
   }

   logout(){
     //remove user from local storage
     localStorage.removeItem("currentUser");
   }

   registerUser(username:string, password:string):Observable<string>{
    this.url = this.baseUrl+"Register";
    return this.http.post<string>(this.url, {"userName":username, "password":password});
  }
}
