import { Component } from '@angular/core';
import * as io from "socket.io-client";
import { SocketService } from '../global/socket.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'register-app',
  templateUrl: 'register.component.html',
})
export class RegisterComponent  { 
    name = 'Angular'; 
    username: string;
    password1: string;
    password2: string;

    constructor(private socketService: SocketService, private router: Router){ } 
    
    registerAccount(){
        var register = {
            username: this.username,
            password1: this.password1,
            password2: this.password2,
        }
        this.socketService.socket.emit('register', JSON.stringify(register));
    } 

    ngOnInit(){
        if(localStorage.getItem('user')){
            this.router.navigateByUrl('/home')
        }
    }
}