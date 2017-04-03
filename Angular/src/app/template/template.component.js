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
var core_1 = require('@angular/core');
var socket_service_1 = require('../global/socket.service');
var forms_1 = require('@angular/forms');
var TemplateComponent = (function () {
    function TemplateComponent(formBuilder, socketService) {
        this.formBuilder = formBuilder;
        this.socketService = socketService;
        this.name = 'Angular';
        this.typesArray = [
            { option: '' },
            { option: 'Multiple-choice' },
            { option: 'Checkboxes' }
        ];
        this.correctAnswerArray = [
            { option: '' },
            { option: 'Correct' },
            { option: 'Incorrect' },
        ];
        this.accessArray = [
            { option: '' },
            { option: 'Private' },
            { option: 'Public' }
        ];
    }
    TemplateComponent.prototype.ngOnInit = function () {
        // initialize quiz
        this.myForm = this.formBuilder.group({
            title: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(30)]],
            owner: [localStorage.getItem('user')],
            questions: this.formBuilder.array([
                this.initQuestion()
            ]),
            access: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]],
        });
    };
    TemplateComponent.prototype.initQuestion = function () {
        // initialize question
        return this.formBuilder.group({
            questionText: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]],
            answers: this.formBuilder.array([
                this.initAnswer()
            ]),
            types: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]],
        });
    };
    TemplateComponent.prototype.initAnswer = function () {
        // initialize answer
        return this.formBuilder.group({
            answerText: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4)]],
            correctAnswer: ['', [forms_1.Validators.required, forms_1.Validators.minLength(1)]],
        });
    };
    TemplateComponent.prototype.addQuestion = function () {
        var control = this.myForm.controls['questions'];
        control.push(this.initQuestion());
    };
    TemplateComponent.prototype.addAnswer = function (input) {
        var control = this.myForm.get('questions.' + input + '.answers');
        control.push(this.initAnswer());
    };
    TemplateComponent.prototype.removeQuestion = function (index) {
        var control = this.myForm.controls['questions'];
        control.removeAt(index);
    };
    TemplateComponent.prototype.removeAnswer = function (questionIndex, answerIndex) {
        var control = this.myForm.get('questions.' + questionIndex + '.answers');
        control.removeAt(answerIndex);
    };
    TemplateComponent.prototype.save = function (model) {
        // call API to save customer
        console.log(model);
        this.socketService.socket.emit('quiz', JSON.stringify(model));
    };
    TemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'template-app',
            templateUrl: 'template.component.html',
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, socket_service_1.SocketService])
    ], TemplateComponent);
    return TemplateComponent;
}());
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=template.component.js.map