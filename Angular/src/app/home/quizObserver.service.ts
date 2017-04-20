import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from '../global/socket.service';

@Injectable()
export class QuizObserverService {
    constructor(private socketService:SocketService){}

    getPublicQuizzes(){ //gets all quizzes to display on home page
        let observable = new Observable((observer:any) => {
            this.socketService.socket.emit('getPublicQuizzes', null, function(error: any, msg: any) { //callback. We send an empty message (null)
                observer.next(msg);
            });
        })
        return observable;
    }

    getQuiz(id: string){ //loads quiz based on id
        let observable = new Observable((observer:any) => {
            this.socketService.socket.emit('getQuiz', JSON.stringify(id), function(error: any, msg: any) {
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

    getMyQuizzes(currentUser: string){ //gets and displays the logged in person's quizzes
        let observable = new Observable((observer:any) => {
            this.socketService.socket.emit('getMyQuizzes', JSON.stringify(currentUser), function(error: any, msg: any) { //callback. We send an empty message (null)
                observer.next(msg);
            });
        })
        return observable;
    }

    submitQuiz(radiobuttons: any, checkboxes: any, quizToDisplay: any){
        var submitQuiz = {
            radiobuttons: radiobuttons,
            checkboxes: checkboxes,
            quizToDisplay: quizToDisplay,
        }
        console.log(checkboxes);
        let observable = new Observable((observer:any) => {
            this.socketService.socket.emit('submitQuiz', JSON.stringify(submitQuiz), function(error: any, msg:any){
                observer.next(msg);
            });
        })
        return observable;
    }
}