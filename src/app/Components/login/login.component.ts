import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform:any;
  loggedin:boolean = false;
  loginInfo:any;

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthenticationService,
              private router: Router,
              private snackBar: MatSnackBar) { }

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

    this.authService.userLogin(this.loginform.value.userName, this.loginform.value.password).subscribe(
      (data) =>{
        this.loginInfo = data;
        console.log("Response",data);

        localStorage.setItem("userName", this.loginInfo.userName);
        localStorage.setItem("userId", this.loginInfo.userId);
        localStorage.setItem("token", this.loginInfo.token);
        localStorage.setItem("role", this.loginInfo.role);
        localStorage.setItem("emailId", this.loginInfo.emailId);
        
        this.snackBar.open("Login successful", "UserLogin", {duration: 1000});

        //Route to respective screens on successful login
        if(this.loginInfo.role === "Admin"){
          this.router.navigate(["/airline"]);
        }
        if(this.loginInfo.role === "User"){
          this.router.navigate(["/flight"]);
        }
      },
      (error) => {
        console.log(error);
        this.snackBar.open("Login UnSuccessful", "UserLogin", {duration: 1000});
      }
    );
  }

  onReset() {
    this.loggedin = false;
    this.loginform.reset();
  }

}
