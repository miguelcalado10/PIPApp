import { FileModel } from './../../../../model/file.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FilesService } from 'src/app/services/files/files.service';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

import { IonInfiniteScroll } from '@ionic/angular';
import { NumberSymbol } from '@angular/common';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers:  [ Platform, File, FileOpener ]
})
export class DashboardPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  allFiles: Array<FileModel>;
  files : Array<FileModel>;
  screenHeight: number;

// tslint:disable-next-line: max-line-length
  constructor( private authService: AuthenticationService, private storage: Storage, private filesServices: FilesService, private platform: Platform, private file: File, private opener: FileOpener ) {}

  ngOnInit() {

    // this.platform.ready().then((readySource) => {
    this.screenHeight = this.platform.height();
    // });
    console.log(this.screenHeight);

    this.storage.get('TOKEN_KEY').then( (data) => {

      const token: string = data;
      console.log(token);

      this.filesServices.getFiles( token ).subscribe( (res: any) => {
        console.log("Files subscribe");
        console.log(res);

        let i = 0;

        this.allFiles = new Array<FileModel>();
        this.files = new Array<FileModel>();

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

  getFile(fileId: number) {
    let token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaXAucC5kZXZlbG9wQGdtYWlsLmNvbSIsImF1ZCI6InBpcHBvcnRhbC5ldSIsImlhdCI6MTU2MTIyMjA1OSwiZGF0YSI6eyJlbWFpbCI6InBjYWxhZG85OUBnbWFpbC5jb20iLCJlbXBsb3llZV9pZCI6IjMzNzQzIn19.uTcTwpxfr4OPRDZXnU3zRg5YwoJojMts6hZwBr4CXsk';
    console.log("getFile")
    this.filesServices.getFile(token, fileId).subscribe((res:any) => {
      // console.log("subscribe")
      // console.log(res.data)

      this.saveAndOpenPdf(res.data, "Teste.pdf");
    });
  }

  saveAndOpenPdf(pdf: string, filename: string) {
    // this.file = new File();
    // this.opener = new FileOpener();
    const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
    console.log(this.file)
    console.log(filename)
    let teste = this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf;base64'), {replace: true})
      .then(() => {
        // this.loading.dismiss();
        this.opener.open(writeDirectory + filename, 'application/pdf')
            .catch(() => {
                console.log('Error opening pdf file');
                // this.loading.dismiss();
            });
    })
    .catch(() => {
        console.error('Error writing pdf file');
        // this.loading.dismiss();
    });

    console.log(teste)

    /*let teste = this.convertBase64ToBlob(pdf, 'data:application/pdf;base64')
    let fileURL = URL.createObjectURL(teste);
    console.log(fileURL)
    window.open(fileURL);*/
  }

  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         const slice = byteCharacters.slice(offset, offset + sliceSize);
         const byteNumbers = new Array(slice.length);
         for (let i = 0; i < slice.length; i++) {
             byteNumbers[i] = slice.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         byteArrays.push(byteArray);
    }
   return new Blob(byteArrays, {type: contentType});
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
