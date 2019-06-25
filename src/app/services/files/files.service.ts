// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class FilesService {

//   constructor() { }
// }



import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const TOKEN_KEY = '';
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  AUTH_SERVER_ADDRESS  =  'http://localhost/pip-p.develop/delta/api/files.php';
  authenticationState = new BehaviorSubject(false);

  constructor( private  httpClient: HttpClient, private storage: Storage, private plt: Platform ) {
    this.plt.ready().then( () => {
      this.checkToken();
    } )
  }

  checkToken() {

    return this.storage.get(TOKEN_KEY).then( res => {
      if( res ) {
        this.authenticationState.next(true);
      }
    })

  }

  getFiles(token: string) {

    // let headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + this.storage.get(TOKEN_KEY)
    // });

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type':'application/json'
    });
    // headers = headers.set('Authorization', 'Bearer ' + token)
    // headers = headers.set('Content-Type', 'application/json')
    // header.append('Authorization', 'Bearer ' + token);
    // header.append('Content-Type', 'application/json');

    // let header = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer ' + token 
    // });

    // let headers = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Authorization': 'Bearer ' + token
    // };

    // let options = new RequestOptions({ headers: headers });
    // console.log(headers.get('Authorization'));
    // console.log(headers.get('Content-Type'));

    return this.httpClient.get( `${this.AUTH_SERVER_ADDRESS}`, { headers: headers } );
  }

  getFile(token: string, fileId: number) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type':'application/json'
    });

    console.log(headers.get('Authorization'))

    return this.httpClient.get( `${this.AUTH_SERVER_ADDRESS}?id=${fileId}`, { headers: headers } );
  }

}
