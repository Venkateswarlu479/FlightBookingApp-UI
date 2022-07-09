import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      //title: ['', Validators.required],
      //firstName: ['', Validators.required],
      //lastName: ['', Validators.required],
      userName: ['', Validators.required],
      //email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      //confirmPassword: ['', Validators.required],
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

    this.authService.registerUser(this.registerForm.value.userName, this.registerForm.value.password).subscribe(obj => {
      // if(obj === null){
      //   alert('User Registration unsuccessful!!');
      // }
      // console.log(obj);
    });
    alert('User Registration Successful!!');
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
