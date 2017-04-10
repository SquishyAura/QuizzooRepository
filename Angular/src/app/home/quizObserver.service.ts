import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from '../global/socket.service';

@Injectable()
export class QuizObserverService {
    constructor(private socketService:SocketService){}

    getQuizzes(){
        let observable = new Observable((observer:any) => {
            this.socketService.socket.emit('getQuizzes', null, function(error: any, msg: any) { //callback. We send an empty message (null)
                //this.quizzesToDisplay = msg;
                observer.next(msg);
            });
        })
        return observable;
    }

    getQuiz(id: string){
        let observable = new Observable((observer:any) => {
            this.socketService.socket.emit('getQuiz', id, function(error: any, msg: any) {
                if(msg.length > 0){
                    observer.next(msg); //if id exists in database, return the JSON object
                }
                else
                {
                    observer.next(error); //if id doesn't exist, return error message
                }
            })
        })
        return observable;
    }
}