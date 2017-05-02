import { Component } from '@angular/core';
import * as io from "socket.io-client";
import { SocketService } from '../global/socket.service';
import { Router } from '@angular/router';
import { LoginObserverService } from './loginObserver.service'
import { AppComponent }  from '../app.component';

@Component({
  moduleId: module.id,
  selector: 'login-app',
  templateUrl: 'login.component.html',
})
export class LoginComponent  { 
    username: string;
    password: string;

    service: any;
    data: any;

    constructor(private socketService: SocketService, private router: Router, private loginObserverService: LoginObserverService, private appComponent: AppComponent){ } 

    loginAccount(){
        this.service = this.loginObserverService.login(this.username, this.password).subscribe(data => {
            if(data == true){
              localStorage.setItem('user', this.username);
              this.appComponent.popUpFade("You have successfully logged in.");
              console.log('logged in');
              this.loginObserverService.user = true;
              this.loginObserverService.guest = false;
              this.router.navigateByUrl('/home');
              return true;
            }
            else
            {
              this.appComponent.popUpFade("Incorrect account information.");
              return false;
            }
        });
    } 

    ngOnInit(){
        if(localStorage.getItem('user')){
              
        }
    }
}
