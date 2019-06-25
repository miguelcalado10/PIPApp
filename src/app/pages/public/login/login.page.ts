import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // constructor( private authService: AuthenticationService ) { }
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController ) { }

  loginForm: FormGroup;
  isSubmitted = false;
  isSubmitting = false;

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  async alertMessage( title: string, subTitle: string, text: string, btnText: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subTitle,
      message: text,
      buttons: [btnText]
   });
    await alert.present();
  }

  get formControls() { return this.loginForm.controls; }

  login() {
    this.authService.login();
  }

  loginApi(){

    const content = $('.content__wrapper');
    $(content).addClass('loading');

    const loading = $('.content__loading');
    $(loading).addClass('active');

    this.isSubmitted = true;
    this.isSubmitting = true;

    if(this.loginForm.invalid) {
      $(content).removeClass('loading');
      $(loading).removeClass('active');
      return;
    }

    this.authService.loginApi( this.loginForm.value ).subscribe( (res) => {
      // console.log(res.email_exists)
      // console.log(res.message)
      // console.log(res.jwt)

      this.isSubmitting = false;
      $(content).removeClass('loading');
      $(loading).removeClass('active');

      if( res.message === 'Invalid credentials' ) {
        this.alertMessage( 'Error', 'Invalid credentials. Please try again', '', 'OK' );
      }
    });

    // this.isSubmitting = false;
    // this.router.navigateByUrl('/admin');
  }

}
