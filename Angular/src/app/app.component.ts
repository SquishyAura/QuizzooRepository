import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as io from "socket.io-client";
import { SocketService } from './global/socket.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent  { 
name = 'Angular'; 
  popUpOpacity: number = 0;
  popUpDisplay: string = "none";
  popUpInnerHTML: string = "";
  guest: boolean;
  user: boolean;

  ngOnInit(){
    if(localStorage.getItem('user') === null){
      this.user = false;
      this.guest = true;
    }
    else if (localStorage.getItem('user') !== null)
    {
      this.guest = false;
      this.user = true;
    }
  }

  popUpFade(input: string): void {
       if(this.popUpOpacity == 0){
          this.popUpDisplay = "table";
          this.popUpOpacity = 0.7;
          this.popUpInnerHTML = input;

          setTimeout(() => this.fade(), 2000); //popup box fades away after 1 seconds
       }
  }
  fade = () => {
      if((this.popUpOpacity -= .01) <= 0)
      {
          this.popUpDisplay = "none";
          this.popUpOpacity = 0;
      }
      else
      {
          requestAnimationFrame(this.fade);
      }
  }
      
  
  constructor(private socketService:SocketService, private router: Router) {

      socketService.socket.on('connect', function() {
        console.log("connected!");
      });

      socketService.socket.on('disconnect', function() {
        console.log("disconnected!");
      });

      socketService.socket.on('registerError', function(msg: string){
        var incomingMsg = JSON.parse(msg);

        if(incomingMsg.passwordNotMatching == true){
            this.popUpFade("The passwords do not match.");
        }

        if(incomingMsg.usernameTaken == true){
            this.popUpFade("Username is already taken.");
        }

        if(incomingMsg.fieldsEmpty == true){
            this.popUpFade("Please fill out all fields.");
        }

        if(incomingMsg.invalidLength == true){
            this.popUpFade("Username & Password must be between 5-20 characters long.");
        }

        if(incomingMsg.correctRegister == true){
          this.popUpFade("You have successfully registered! Redirecting to the login page.");
          setTimeout(() => this.router.navigateByUrl('/login'), 3000); //redirects to login page after 3 seconds
        }
      }.bind(this));  

      socketService.socket.on('loginError', function(msg: string){
        var incomingMsg = JSON.parse(msg);
        if(incomingMsg.incorrectAccount == true){
          this.popUpFade("Incorrect account information.");
        }
      }.bind(this));

      socketService.socket.on('loginSuccess', function(msg: string){
        var incomingMsg = JSON.parse(msg);
        if(incomingMsg.correctAccount == true){
          localStorage.setItem('user', JSON.stringify(incomingMsg.username))
          this.popUpFade("You have successfully logged in.");
          this.user = true;
          this.guest = false;
          this.router.navigateByUrl('/home')
        }
      }.bind(this));
  }

  logoutAccount(){
    localStorage.removeItem('user');
    this.user = false;
    this.guest = true;
    this.popUpFade("Logged out.");
    this.router.navigateByUrl('/login')
  }
}