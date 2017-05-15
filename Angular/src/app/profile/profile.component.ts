import { Component, OnInit, ElementRef } from '@angular/core';
import * as io from "socket.io-client";
import { Router } from '@angular/router';
import { QuizObserverService } from '../home/quizObserver.service';
import { SocketService } from '../global/socket.service';

@Component({
  moduleId: module.id,
  selector: 'profile-app',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent implements OnInit {
    service: any;
    data: any;
    myQuizzes: any;
    currentUser: string;

    constructor(private router:Router, private quizObserverService:QuizObserverService, private socketService:SocketService, private elementRef:ElementRef){
        this.currentUser = localStorage.getItem('user');
    }

    ngOnInit() {
        this.service = this.quizObserverService.getMyQuizzes(localStorage.getItem('user')).subscribe(data => { //only gets JSON upon page load
            this.myQuizzes = data;
        })
    }
}