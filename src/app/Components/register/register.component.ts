import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      acceptTerms: [false, Validators.requiredTrue]
    }
    );
  }
  // convenience getter for easy access to form fields 
  get f() 
  { 
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid 
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.registerUser(this.registerForm.value.userName, this.registerForm.value.password, this.registerForm.value.email).subscribe(
      obj => {
          this.snackBar.open("Registration successful", "registerUser", {duration: 1000});
          //Route to Login on successful Registration
          this.router.navigate([""]);
      },
      error => {
        console.log("error", error);
        this.snackBar.open("Registration Unsuccessful", "registerUser", {duration: 1000});
      }
    );    
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
