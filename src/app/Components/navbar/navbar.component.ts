import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole:any;
  isAdminLoggedin: boolean = false;
  isUserLoggedin: boolean = false;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("emailId");

    this.router.navigate([""]);
  }

  get isAnyUserLogin(){
    const token = localStorage.getItem("token");
    return token && token.length>0;
  }

  get isAdminLogin(){
    const role = localStorage.getItem("role");
    return role && (role == "Admin");
  }

}
