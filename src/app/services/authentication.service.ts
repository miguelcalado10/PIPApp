import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from './../../model/user.model'
import { AuthResponse } from './../../model/auth-response.model';

const TOKEN_KEY = '';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  AUTH_SERVER_ADDRESS  =  'http://localhost/pip-p.develop/delta/api/login.php';
  authenticationState = new BehaviorSubject(false);

  constructor( private  httpClient: HttpClient, private storage: Storage, private plt: Platform ) {
    this.plt.ready().then( () => {
      this.checkToken();
    } )
  }

  login() {

    return this.storage.set(TOKEN_KEY, 'teste12345').then( res => {
      this.authenticationState.next( true );
    } );

  }

  // loginApi( email1: string, password1: string ): Observable<AuthResponse> {
  public loginApi(userInfo: User){
    console.log('info: ' + JSON.stringify(userInfo))

    const body = {email: userInfo.email, password: userInfo.password};

    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}`, body).pipe(
      tap(async (res: AuthResponse) => {

        if ( res['message'] === 'Success' ) {
          console.log( 'Sucesso' );

          await this.storage.set(TOKEN_KEY, res['jwt']);
          this.authenticationState.next(true);

        } else {
          console.log( 'Erro' );
        }

        // console.log( 'Token: ' + this.storage.get(TOKEN_KEY) );
        this.storage.get(TOKEN_KEY).then(function(value) {
          console.log( 'Token: ' + value );
        });

      })
    );
  }

  logout() {

    return this.storage.remove(TOKEN_KEY).then( () => {
      this.authenticationState.next( false );

      // console.log( 'Token: ' + this.storage.get(TOKEN_KEY) );
      this.storage.get(TOKEN_KEY).then(function(value) {
        // console.log( 'Token: ' + value );
      });
    } );

  }

  isAuthenticated() {

    return this.authenticationState.value;

  }

  checkToken() {

    return this.storage.get(TOKEN_KEY).then( res => {
      if( res ) {
        this.authenticationState.next(true);
      }
    })

  }

}
