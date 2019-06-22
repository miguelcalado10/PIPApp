import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../../../auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // constructor( private authService: AuthenticationService ) { }
  constructor(private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder ) { }

  loginForm: FormGroup;
  isSubmitted  =  false;

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }

  login() {
    this.authService.login();
  }

  loginApi(){
    this.isSubmitted = true;

    if(this.loginForm.invalid){
      return;
    }

    // this.authService.loginApi( this.loginForm.value );
    this.authService.loginApi( this.loginForm.value ).subscribe( res => {console.log(res)});

    // this.router.navigateByUrl('/admin');
  }

}
