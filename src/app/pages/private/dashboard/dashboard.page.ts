import { File } from './../../../../model/file.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FilesService } from 'src/app/services/files.service';
import { Storage } from '@ionic/storage';
import {Platform} from '@ionic/angular';

import { IonInfiniteScroll } from '@ionic/angular';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  allFiles: Array<File>;
  files: Array<File>;
  screenHeight: number;

// tslint:disable-next-line: max-line-length
  constructor( private authService: AuthenticationService, private storage: Storage, private filesServices: FilesService, private platform: Platform ) {}

  ngOnInit() {

    // this.platform.ready().then((readySource) => {
    this.screenHeight = this.platform.height();
    // });
    console.log(this.screenHeight);

    this.storage.get('TOKEN_KEY').then( (data) => {

      const token: string = data;
      // console.log(token);

      this.filesServices.getFiles( token ).subscribe( (res: any) => {
        console.log("Files subscribe");
        console.log(res);

        let i = 0;

        this.allFiles = new Array<File>();
        this.files = new Array<File>();

        if ( res.files ) {
          res.files.forEach(element => {

            // this.allFiles.push({
            //   id: element.file_id,
            //   name: element.filename,
            //   s3_id: element.string,
            //   date: element.file_date
            // });

            // // Apresenta primeiros 8
            // if( i < 8) {
              this.files.push({
                id: element.file_id,
                name: element.filename,
                s3_id: element.string,
                date: element.file_date
              });
            // }

            // i++;

          });
        }
      });

    })
    // .catch(error => handleError(error))
    // .finally(() => handleFinally())
    ;

  }

  logout() {
    this.authService.logout();
  }

  // loadData(event) {
  //   console.log(this.files.length)
  //   console.log(this.allFiles.length)

  //   setTimeout(() => {

  //     for (let i = 0; i < 8; i++) {
  //       let current = i + this.files.length;

  //       if( current < this.allFiles.length ) {
  //         this.files.push(this.allFiles[current]);
  //       }

  //     }
  //     event.target.complete();

  //     if (this.files.length === 1000) {
  //       event.target.disabled = true;
  //     }

  //   }, 500);
  // }


  // toggleInfiniteScroll() {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  // }

}
