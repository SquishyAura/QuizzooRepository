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
    correctAnswerMultipleChoice: string = 'Incorrect';
    CheckboxesValues: string[] = [];
    correctAnswerCheckbox: string = 'Incorrect';
    submitted: boolean = false;
    answersArray: any[] = [];

    constructor(private router:Router, private quizObserverService:QuizObserverService, private socketService:SocketService, private elementRef:ElementRef){
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

    handleMultiplechoiceAnswer(){
        let rawr = this.elementRef.nativeElement.querySelectorAll('#rawr');



        for(let i = 0; i < this.quizToDisplay[0].questions.length; i++){
            if(this.quizToDisplay[0].questions[i].types == "Multiple-choice"){
                for(let j = 0; j < this.quizToDisplay[0].questions[i].answers.length; j++){
                    this.answersArray.push(this.quizToDisplay[0].questions[i].answers[j]);
                }
            }
        }

        if(this.handleMultiplechoiceAnswerCorrect(rawr)){
            return this.handleMultiplechoiceAnswerCorrect(rawr);
        }
        else
        {
            return this.handleMultiplechoiceAnswerIncorrect(rawr);
        }
    }

    handleMultiplechoiceAnswerCorrect(rawr: any){
        for(let k = 0; k < rawr.length; k++){

            if(this.answersArray[k].correctAnswer == rawr[k].value && rawr[k].value == "Correct" && rawr[k].checked == true){ 
                return "Correct";
            }
        }
    }

    handleMultiplechoiceAnswerIncorrect(rawr: any){
        return "Incorrect";
    }

    handleCheckboxAnswer(index: number, correct: string) {
        this.CheckboxesValues[index] = correct;
    }

    submitAnswer(){
        this.submitted = true;
        this.correctAnswerMultipleChoice = this.handleMultiplechoiceAnswer();
    }
}