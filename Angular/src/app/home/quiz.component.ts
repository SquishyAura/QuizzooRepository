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
    correctAnswerMultipleChoice: string[] = [];
    submitted: boolean = false;
    test: string;

    timers = {'hours': 0, 'minutes': 0, 'seconds': 0}
    duration: number;
    counter: number;

    constructor(private router:Router, private quizObserverService:QuizObserverService, private socketService:SocketService, private elementRef:ElementRef){
        this.currentUser = localStorage.getItem('user');
    }

    ngOnInit() {
        this.service = this.quizObserverService.getQuiz(this.router.url).subscribe(data => { //subscribes to service & gets JSON upon page load
            console.log(data);
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

    handleMultiplechoiceAnswer(){
        let radiobuttons = this.elementRef.nativeElement.getElementsByClassName('answerClass');
 
        this.correctAnswerMultipleChoice = [];
        let k = 0;
        for(let i = 0; i < this.quizToDisplay[0].questions.length; i++){
            if(this.quizToDisplay[0].questions[i].types == "Multiple-choice"){
                let isCorrect = false;
                for(let j = 0; j < this.quizToDisplay[0].questions[i].answers.length; j++){
                    if(radiobuttons[k].checked == true && this.quizToDisplay[0].questions[i].answers[j].correctAnswer === 'Correct'){ 
                        isCorrect = true;
                    }
                    k++;
                }
            if(isCorrect == true){
                this.correctAnswerMultipleChoice.push('Correct');  
            }
            else
            {
                this.correctAnswerMultipleChoice.push('Incorrect')
            }
          }
        }
    }

    countdown(){
        if(this.duration > 0){
            this.duration--;
            this.timers['seconds'] = this.duration % 60;
            this.timers['minutes'] = Math.trunc((this.duration / 60) % 60);
            this.timers['hours'] = Math.trunc((this.duration / 60 / 60 ) % 24);
            
            setTimeout(() => { if(this.submitted == false){ this.countdown(); }}, 1000);
        }
        else
        {
            this.submitAnswer();
        }
    }

    submitAnswer(){
        this.submitted = true;
        this.handleMultiplechoiceAnswer();
    }
}