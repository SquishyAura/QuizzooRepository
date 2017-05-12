import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as io from "socket.io-client";
import { Router } from '@angular/router';
import { QuizObserverService } from './quizObserver.service';
import { SocketService } from '../global/socket.service';
import { AppComponent }  from '../app.component';

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

    timers = {'hours': 0, 'minutes': 0, 'seconds': 0};
    stopTimer: boolean = false;

    constructor(private router:Router, private quizObserverService:QuizObserverService, private socketService:SocketService, private elementRef:ElementRef, private app:AppComponent){
        this.currentUser = localStorage.getItem('user');
    }

    ngOnInit() {
        this.service = this.quizObserverService.getQuiz(this.router.url).subscribe(data => { //subscribes to service & gets JSON upon page load
            this.quizToDisplay = data;
            if(data[0].duration != 'Unlimited'){ //if quiz duration isn't unlimited, the timer is run.
                this.countdown(data[0].duration * 60);
            }
        })
    }

    ngOnDestroy() {
        this.service.unsubscribe();
        this.stopTimer = true;
    }

    deleteQuiz(id: string){
        this.socketService.socket.emit('deleteQuiz', JSON.stringify(id));
        setTimeout(() => this.router.navigateByUrl('/home'), 1000);
        this.app.popUpFade("Quiz has been deleted.");
    }

    countdown(duration: number){
        if(this.stopTimer == false){
            if(duration > 0){
                duration--;
                this.timers['seconds'] = duration % 60;
                this.timers['minutes'] = Math.trunc((duration / 60) % 60);
                this.timers['hours'] = Math.trunc((duration / 60 / 60 ) % 24);
                
                setTimeout(() => { //if user still hasn't submitted, timer contiously decrements 
                    if(this.submitted == false){ 
                        this.countdown(duration); 
                    }
                }, 1000);
            }
            else
            {
                this.submitAnswer(); //submit answer if timer reached 0
                this.app.popUpFade("Time has run out. Your answers were submitted.");
            }
        }
    }

    routeToStatisticsPage(){
        this.router.navigateByUrl(this.router.url + '/statistics');
    }

    showQuizRating(){
        let quizPanel = this.elementRef.nativeElement.querySelector('.quizRatingPanel');
        quizPanel.style.opacity = 1; 
        quizPanel.style.pointerEvents = "auto";

        let quizBackground = this.elementRef.nativeElement.querySelector('.quizRatingBackground');
        quizBackground.style.opacity = 0.7;
        quizBackground.style.pointerEvents = "auto";
    }

    closeQuizRating(){
        let quizPanel = this.elementRef.nativeElement.querySelector('.quizRatingPanel');
        quizPanel.style.opacity = 0; 
        quizPanel.style.pointerEvents = "none";

        let quizBackground = this.elementRef.nativeElement.querySelector('.quizRatingBackground');
        quizBackground.style.opacity = 0;
        quizBackground.style.pointerEvents = "none";
    }

    submitQuizRating(value: any){
        let ratings = this.elementRef.nativeElement.getElementsByClassName('ratings');
        let ratingsCheck:any = [];

        for(let i = 0; i < ratings.length; i++){
            ratingsCheck.push(ratings[i].checked);
        }
        
        let storeRating = {
            ratingsCheck: ratingsCheck,
            id: this.router.url.split("/")[3]
        }

        this.socketService.socket.emit('rating', JSON.stringify(storeRating));
        this.closeQuizRating();
        this.app.popUpFade("Your rating has been saved.");
    }

    submitAnswer(){
        let radiobuttons = this.elementRef.nativeElement.getElementsByClassName('radiobuttons');
        let checkboxes = this.elementRef.nativeElement.getElementsByClassName('checkboxes');
        let radiobuttonsCheck:any = [];
        let checkboxesCheck:any = [];

        for(let i = 0; i < radiobuttons.length; i++){
            radiobuttonsCheck.push(radiobuttons[i].checked);
        }

        for(let i = 0; i < checkboxes.length; i++){
            checkboxesCheck.push(checkboxes[i].checked);
        }

        this.service = this.quizObserverService.submitQuiz(radiobuttonsCheck, checkboxesCheck, this.quizToDisplay, this.currentUser).subscribe((data: any) => {
            this.feedbackArray = data.feedbackArray;
            this.submitted = true;
            this.app.popUpFade("Your answers have been submitted.");
        });
    }
}