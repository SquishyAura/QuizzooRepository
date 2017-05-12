"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const socket_service_1 = require('../global/socket.service');
const forms_1 = require('@angular/forms');
const router_1 = require('@angular/router');
const app_component_1 = require('../app.component');
let TemplateComponent = class TemplateComponent {
    constructor(formBuilder, socketService, router, app) {
        this.formBuilder = formBuilder;
        this.socketService = socketService;
        this.router = router;
        this.app = app;
        this.typesArray = [
            { option: '' },
            { option: 'Multiple-choice' },
            { option: 'Checkboxes' },
        ];
        this.correctAnswerArray = [
            { option: '' },
            { option: 'Correct' },
            { option: 'Incorrect' },
        ];
        this.accessArray = [
            { option: '' },
            { option: 'Public' },
            { option: 'Private' },
        ];
        this.durationArray = [
            { option: '' },
            { option: '1' },
            { option: '2' },
            { option: '5' },
            { option: '10' },
            { option: '15' },
            { option: '20' },
            { option: '30' },
            { option: '60' },
            { option: '120' },
            { option: '180' },
            { option: '240' },
            { option: 'Unlimited' },
        ];
    }
    ngOnInit() {
        // initialize quiz
        this.myForm = this.formBuilder.group({
            title: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(30)]],
            owner: localStorage.getItem('user'),
            access: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]],
            duration: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]],
            individualFeedback: this.formBuilder.array([]),
            ratings: this.formBuilder.array([]),
            id: "0",
            questions: this.formBuilder.array([
                this.initQuestion()
            ]),
        });
    }
    initQuestion() {
        // initialize question
        return this.formBuilder.group({
            questionText: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]],
            types: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]],
            answers: this.formBuilder.array([
                this.initAnswer()
            ]),
        });
    }
    initAnswer() {
        // initialize answer
        return this.formBuilder.group({
            answerText: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]],
            correctAnswer: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]],
            numberOfClicks: "0",
        });
    }
    addQuestion() {
        //form control initializes a new question, and pushes that question to the questions array 
        const control = this.myForm.controls['questions'];
        control.push(this.initQuestion());
    }
    addAnswer(input) {
        //form control initializes a new answer at a certain question index, and pushes that answer to the questions array 
        const control = this.myForm.get('questions.' + input + '.answers');
        control.push(this.initAnswer());
    }
    removeQuestion(questionIndex) {
        //remove question from questions array
        const control = this.myForm.controls['questions'];
        control.removeAt(questionIndex);
    }
    removeAnswer(questionIndex, answerIndex) {
        //remove answer at certain question index from answers array
        const control = this.myForm.get('questions.' + questionIndex + '.answers');
        control.removeAt(answerIndex);
    }
    save() {
        //converts the form to a more readable value, which gets converted to a json object.
        let formObject = this.myForm.getRawValue();
        return formObject;
    }
    emitQuiz() {
        //sends the form object to the server.
        this.socketService.socket.emit('quiz', JSON.stringify(this.save()));
        setTimeout(() => this.router.navigateByUrl('/home'), 1000);
        this.app.popUpFade("Quiz created.");
    }
};
TemplateComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'template-app',
        templateUrl: 'template.component.html',
    }), 
    __metadata('design:paramtypes', [forms_1.FormBuilder, socket_service_1.SocketService, router_1.Router, app_component_1.AppComponent])
], TemplateComponent);
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=template.component.js.map