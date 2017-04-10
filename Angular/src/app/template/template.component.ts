import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";
import { SocketService } from '../global/socket.service';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'template-app',
  templateUrl: 'template.component.html',
})
export class TemplateComponent implements OnInit { name = 'Angular'; 
    public myForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private socketService: SocketService, private router: Router) { }

    private typesArray = [
        {option: ''},
        {option: 'Multiple-choice'},
        {option: 'Checkboxes'}
    ];

    private correctAnswerArray = [
        {option: ''},
        {option: 'Correct'},
        {option: 'Incorrect'},
    ];

    private accessArray = [
        {option: ''},
        {option: 'Private'},
        {option: 'Public'}
    ]

    ngOnInit() {
        // initialize quiz
        this.myForm = this.formBuilder.group({
            id: "0",
            title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
            owner: localStorage.getItem('user'),
            questions: this.formBuilder.array([
                this.initQuestion()
            ]),
            access: ['', [Validators.required, Validators.minLength(1)]],
        }); 
    }

    initQuestion() {
        // initialize question
        return this.formBuilder.group({
            questionText: ['', [Validators.required, Validators.minLength(10)]],
            answers: this.formBuilder.array([
                this.initAnswer()
            ]),
            types: ['', [Validators.required, Validators.minLength(1)]],
        });
    }

    initAnswer() {
        // initialize answer
        return this.formBuilder.group({
            answerText: ['', [Validators.required, Validators.minLength(1)]],
            correctAnswer: ['', [Validators.required, Validators.minLength(1)]],
        });
    }

    addQuestion() {
        const control = <FormArray>this.myForm.controls['questions'];
        control.push(this.initQuestion());
    }

    addAnswer(input: number) {
        const control = <FormArray>this.myForm.get('questions.' + input + '.answers');
        control.push(this.initAnswer());
    }

    removeQuestion(index: number) {
        const control = <FormArray>this.myForm.controls['questions'];
        control.removeAt(index);
    }

    removeAnswer(questionIndex: number, answerIndex: number) {
        const control = <FormArray>this.myForm.get('questions.' + questionIndex + '.answers');
        control.removeAt(answerIndex);
    }

    save() {
        let formObject = this.myForm.getRawValue();
        return formObject;
    }

    emitQuiz(){
        this.socketService.socket.emit('quiz', JSON.stringify(this.save()));
        setTimeout(() => this.router.navigateByUrl('/home'), 1000);
    }
}
