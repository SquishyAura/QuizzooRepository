import { Component, OnInit, OnDestroy } from '@angular/core';
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
    correctAnswerMultipleChoice: string = 'Incorrect';
    CheckboxesValues: string[] = [];
    correctAnswerCheckbox: string = 'Incorrect';
    submitted: boolean = false;

    constructor(private router:Router, private quizObserverService:QuizObserverService, private socketService:SocketService){
        this.currentUser = localStorage.getItem('user');
    }

    ngOnInit() {
        this.service = this.quizObserverService.getQuiz(this.router.url).subscribe(data => { //only gets JSON upon page load
            console.log(data);
            this.quizToDisplay = data;
        })
    }

    ngOnDestroy() {
        this.service.unsubscribe();
    }

    deleteQuiz(id: string){
        this.socketService.socket.emit('deleteQuiz', JSON.stringify(id));
        this.router.navigateByUrl('/home');
    }

    handleCheckboxAnswer(index: number, correct: string) {
        this.CheckboxesValues[index] = correct;
    }

    submitAnswer(){
        this.submitted = true;
        if(this.CheckboxesValues.indexOf('Incorrect', 0) < 0){
            this.correctAnswerCheckbox = "Correct";
        }
    }
} 