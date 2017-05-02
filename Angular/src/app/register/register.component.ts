import { Component } from '@angular/core';
import * as io from "socket.io-client";
import { SocketService } from '../global/socket.service';
import { Router } from '@angular/router';
import { RegisterObserverService } from './registerObserver.service';
import { AppComponent }  from '../app.component';

@Component({
  moduleId: module.id,
  selector: 'register-app',
  templateUrl: 'register.component.html',
})
export class RegisterComponent  { 
    username: string;
    password1: string;
    password2: string;

    service: any;
    data: any;

    constructor(private socketService: SocketService, private router: Router, private registerObserverService: RegisterObserverService, private appComponent: AppComponent){ } 
    
    registerAccount(){
        this.service = this.registerObserverService.register(this.username, this.password1, this.password2).subscribe((data: any) => {
            if(data == true){
                this.appComponent.popUpFade("You have successfully registered!");
                return true;
            }
            else
            {
                this.appComponent.popUpFade(data);
                return false;
            }
        })
    } 

    ngOnInit(){
        if(localStorage.getItem('user')){
            this.router.navigateByUrl('/home')
        }
    }
}