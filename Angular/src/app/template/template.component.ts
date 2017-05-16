import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";
import { SocketService } from '../global/socket.service';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent }  from '../app.component';

@Component({
  moduleId: module.id,
  selector: 'template-app',
  templateUrl: 'template.component.html',
})
export class TemplateComponent implements OnInit {  
    public myForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private socketService: SocketService, private router: Router, private app:AppComponent) { }

    private typesArray = [
        {option: ''},
        {option: 'Multiple-choice'},
        {option: 'Checkboxes'},
    ];

    private correctAnswerArray = [
        {option: ''},
        {option: 'Correct'},
        {option: 'Incorrect'},
    ];

    private accessArray = [
        {option: ''},
        {option: 'Public'},
        {option: 'Private'},
    ];

    private durationArray = [
        {option: ''},
        {option: '1'},
        {option: '2'},
        {option: '5'},
        {option: '10'},
        {option: '15'},
        {option: '20'},
        {option: '30'},
        {option: '60'},
        {option: '120'},
        {option: '180'},
        {option: '240'},
        {option: 'Unlimited'},
    ];

    ngOnInit() {
        // initialize quiz
        this.myForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
            owner: localStorage.getItem('user'),
            access: ['', [Validators.required, Validators.minLength(1)]],
            duration: ['', [Validators.required, Validators.minLength(1)]],
            individualFeedback: this.formBuilder.array([]),
            ratings: this.formBuilder.array([]),
            id: ["0", [Validators.required, Validators.maxLength(1)]],
            questions: this.formBuilder.array([
                this.initQuestion()
            ]),
        }); 
    }

    initQuestion() {
        // initialize question
        return this.formBuilder.group({
            questionText: ['', [Validators.required, Validators.minLength(10)]],
            types: ['', [Validators.required, Validators.minLength(1)]],
            answers: this.formBuilder.array([
                this.initAnswer()
            ]),
        });
    }

    initAnswer() {
        // initialize answer
        return this.formBuilder.group({
            answerText: ['', [Validators.required, Validators.minLength(1)]],
            correctAnswer: ['', [Validators.required, Validators.minLength(1)]],
            numberOfClicks: ["0", [Validators.required, Validators.maxLength(1)]],
        });
    }

    addQuestion() {
        //form control initializes a new question, and pushes that question to the questions array 
        const control = <FormArray>this.myForm.controls['questions'];
        control.push(this.initQuestion());
    }

    addAnswer(input: number) {
        //form control initializes a new answer at a certain question index, and pushes that answer to the questions array 
        const control = <FormArray>this.myForm.get('questions.' + input + '.answers');
        control.push(this.initAnswer());
    }

    removeQuestion(questionIndex: number) {
        //remove question from questions array
        const control = <FormArray>this.myForm.controls['questions'];
        control.removeAt(questionIndex);
    }

    removeAnswer(questionIndex: number, answerIndex: number) {
        //remove answer at certain question index from answers array
        const control = <FormArray>this.myForm.get('questions.' + questionIndex + '.answers');
        control.removeAt(answerIndex);
    }

    save() {
        //converts the form to a more readable value, which gets converted to a json object.
        let formObject = this.myForm.getRawValue();
        return formObject;
    }

    emitQuiz(){
        //sends the form object to the server.
        this.socketService.socket.emit('quiz', JSON.stringify(this.save()));
        setTimeout(() => this.router.navigateByUrl('/home'), 1000);
        this.app.popUpFade("Quiz created.");
    }
}
