import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginObserverService } from './login/loginObserver.service';
import { SocketService } from './global/socket.service'; // socket service

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent  {  
    popUpOpacity: number = 0;
    popUpDisplay: string = "none";
    popUpInnerHTML: string = "";

    constructor(private socketService: SocketService, private router: Router, private loginObserverService: LoginObserverService) {
        socketService.socket.on('connect', function() {
            console.log("connected!");
        });

        socketService.socket.on('disconnect', function() {
            console.log("disconnected!");
        }); 
    }

    ngOnInit(){
        if(localStorage.getItem('user') === null){
            this.loginObserverService.user = false;
            this.loginObserverService.guest = true;
        }
        else if (localStorage.getItem('user') !== null)
        {
            this.loginObserverService.guest = false;
            this.loginObserverService.user = true;
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

    logoutAccount(){
        localStorage.removeItem('user');
        this.loginObserverService.user = false;
        this.loginObserverService.guest = true;
        this.popUpFade("Logged out.");
        this.router.navigateByUrl('/login');
    }
}