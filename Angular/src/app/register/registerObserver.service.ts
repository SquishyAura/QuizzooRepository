import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from '../global/socket.service';

@Injectable()
export class RegisterObserverService{
    constructor(private socketService:SocketService){}

    register(username: string, password1: string, password2: string){
        var register = {
            username: username,
            password1: password1,
            password2: password2
        }

        let observable = new Observable((observer:any) => {
            this.socketService.socket.emit('register', JSON.stringify(register), function(error: any, msg: any){
                observer.next(msg);
            });
        });
        return observable;
    }
}