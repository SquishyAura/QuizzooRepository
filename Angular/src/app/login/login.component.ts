import { Component } from '@angular/core';
import * as io from "socket.io-client";
import { SocketService } from '../global/socket.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'login-app',
  templateUrl: 'login.component.html',
})
export class LoginComponent  { 
  name = 'Angular'; 
  username: string;
  password: string;

  constructor(private socketService: SocketService, private router: Router){ } 

  loginAccount(){
    var login = {
        username: this.username,
        password: this.password,
    }
    this.socketService.socket.emit('login', JSON.stringify(login));
  } 

  ngOnInit(){
    if(localStorage.getItem('user')){
        this.router.navigateByUrl('/home');
    }
  }
}
