import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from '../global/socket.service';

@Injectable()
export class LoginObserverService{
    constructor(private socketService:SocketService){}
    guest: boolean;
    user: boolean;

    login(username: string, password: string){
        var login = {
            username: username,
            password: password,
        }
        
        let observable = new Observable((observer:any) => {
            this.socketService.socket.emit('login', JSON.stringify(login), function(error: any, msg: any){
                observer.next(msg);
            });
        })
        return observable;
    }
}