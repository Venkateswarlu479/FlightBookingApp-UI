import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform:any;
  loggedin:boolean = false;
  token:any;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required] 
    });
  }

  // convenience getter for easy access to form fields 
  get f() 
  { 
    return this.loginform.controls; 
  }

  onLogin() {
    this.loggedin = true;
    // stop here if form is invalid 
    if (this.loginform.invalid) {
      return;
    }

    this.authService.userLogin(this.loginform.value.userName, this.loginform.value.password).subscribe(obj =>{
      if(obj == undefined || null){
        alert('login unsuccessful');
      }
      this.token = obj;
      console.log(obj);
      if(this.token != null){
        this.authService.setLocalStorage(this.token);
      }
    });
    alert('Login Successful!!');
  }

  onReset() {
    this.loggedin = false;
    this.loginform.reset();
  }

}
