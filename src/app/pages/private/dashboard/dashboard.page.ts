import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor( private authService: AuthenticationService, private filesServices: FilesService ) { }

  ngOnInit() {
    // get current token

    let token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaXAucC5kZXZlbG9wQGdtYWlsLmNvbSIsImF1ZCI6InBpcHBvcnRhbC5ldSIsImlhdCI6MTU2MTIyMjA1OSwiZGF0YSI6eyJlbWFpbCI6InBjYWxhZG85OUBnbWFpbC5jb20iLCJlbXBsb3llZV9pZCI6IjMzNzQzIn19.uTcTwpxfr4OPRDZXnU3zRg5YwoJojMts6hZwBr4CXsk';

    this.filesServices.getFiles( token ).subscribe( res => {console.log(res)});
  }

  logout() {
    this.authService.logout();
  }

}
