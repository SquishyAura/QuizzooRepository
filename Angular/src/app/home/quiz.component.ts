import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as io from "socket.io-client";
import { Router } from '@angular/router';
import { QuizObserverService } from './quizObserver.service';
import { SocketService } from '../global/socket.service';

@Component({
  moduleId: module.id,
  selector: 'quiz-app',
  templateUrl: 'quiz.component.html',
})
export class QuizComponent implements OnInit, OnDestroy {
    service: any;
    data: any;

    quizToDisplay: any;
    currentUser: string;
    feedbackArray: string[] = [];
    submitted: boolean = false;

    timers = {'hours': 0, 'minutes': 0, 'seconds': 0}
    duration: number;
    counter: number;

    constructor(private router:Router, private quizObserverService:QuizObserverService, private socketService:SocketService, private elementRef:ElementRef){
        this.currentUser = localStorage.getItem('user');
    }

    ngOnInit() {
        this.service = this.quizObserverService.getQuiz(this.router.url).subscribe(data => { //subscribes to service & gets JSON upon page load
            //console.log(data);
            this.quizToDisplay = data;
            if(this.quizToDisplay[0].duration != 'Unlimited'){ //if quiz duration isn't unlimited, the timer is run.
                this.duration = this.quizToDisplay[0].duration * 60; //in seconds
                this.countdown();
            }
        })
    }

    ngOnDestroy() {
        this.service.unsubscribe();
    }

    deleteQuiz(id: string){
        this.socketService.socket.emit('deleteQuiz', JSON.stringify(id));
        this.router.navigateByUrl('/home');
    }

    countdown(){
        if(this.duration > 0){
            this.duration--;
            this.timers['seconds'] = this.duration % 60;
            this.timers['minutes'] = Math.trunc((this.duration / 60) % 60);
            this.timers['hours'] = Math.trunc((this.duration / 60 / 60 ) % 24);
            
            setTimeout(() => { //if user still hasn't submitted, timer contiously decrements 
                if(this.submitted == false){ 
                    this.countdown(); 
                }
            }, 1000);
        }
        else
        {
            this.submitAnswer(); //submit answer if timer reached 0
        }
    }

    routeToStatisticsPage(){
        this.router.navigateByUrl(this.router.url + '/statistics');
    }

    submitAnswer(){
        let radiobuttons = this.elementRef.nativeElement.getElementsByClassName('radiobuttons');
        let checkboxes = this.elementRef.nativeElement.getElementsByClassName('checkboxes');
        let radiobuttonsCheck = [];
        let checkboxesCheck = [];

        for(let i = 0; i < radiobuttons.length; i++){
            radiobuttonsCheck.push(radiobuttons[i].checked);
        }

        for(let i = 0; i < checkboxes.length; i++){
            checkboxesCheck.push(checkboxes[i].checked);
        }

        this.service = this.quizObserverService.submitQuiz(radiobuttonsCheck, checkboxesCheck, this.quizToDisplay).subscribe((data: any) => {
            this.feedbackArray = data.feedbackArray;
            this.submitted = true;
        });
    }
}