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
var router_1 = require('@angular/router');
var quizObserver_service_1 = require('./quizObserver.service');
var socket_service_1 = require('../global/socket.service');
var QuizComponent = (function () {
    function QuizComponent(router, quizObserverService, socketService, elementRef) {
        this.router = router;
        this.quizObserverService = quizObserverService;
        this.socketService = socketService;
        this.elementRef = elementRef;
        this.correctAnswerMultipleChoice = 'Incorrect';
        this.CheckboxesValues = [];
        this.correctAnswerCheckbox = 'Incorrect';
        this.submitted = false;
        this.answersArray = [];
        this.currentUser = localStorage.getItem('user');
    }
    QuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service = this.quizObserverService.getQuiz(this.router.url).subscribe(function (data) {
            console.log(data);
            _this.quizToDisplay = data;
        });
    };
    QuizComponent.prototype.ngOnDestroy = function () {
        this.service.unsubscribe();
    };
    QuizComponent.prototype.deleteQuiz = function (id) {
        this.socketService.socket.emit('deleteQuiz', JSON.stringify(id));
        this.router.navigateByUrl('/home');
    };
    QuizComponent.prototype.handleMultiplechoiceAnswer = function () {
        var rawr = this.elementRef.nativeElement.querySelectorAll('#rawr');
        for (var i = 0; i < this.quizToDisplay[0].questions.length; i++) {
            if (this.quizToDisplay[0].questions[i].types == "Multiple-choice") {
                for (var j = 0; j < this.quizToDisplay[0].questions[i].answers.length; j++) {
                    this.answersArray.push(this.quizToDisplay[0].questions[i].answers[j]);
                }
            }
        }
        if (this.handleMultiplechoiceAnswerCorrect(rawr)) {
            return this.handleMultiplechoiceAnswerCorrect(rawr);
        }
        else {
            return this.handleMultiplechoiceAnswerIncorrect(rawr);
        }
    };
    QuizComponent.prototype.handleMultiplechoiceAnswerCorrect = function (rawr) {
        for (var k = 0; k < rawr.length; k++) {
            if (this.answersArray[k].correctAnswer == rawr[k].value && rawr[k].value == "Correct" && rawr[k].checked == true) {
                return "Correct";
            }
        }
    };
    QuizComponent.prototype.handleMultiplechoiceAnswerIncorrect = function (rawr) {
        return "Incorrect";
    };
    QuizComponent.prototype.handleCheckboxAnswer = function (index, correct) {
        this.CheckboxesValues[index] = correct;
    };
    QuizComponent.prototype.submitAnswer = function () {
        this.submitted = true;
        this.correctAnswerMultipleChoice = this.handleMultiplechoiceAnswer();
    };
    QuizComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quiz-app',
            templateUrl: 'quiz.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, quizObserver_service_1.QuizObserverService, socket_service_1.SocketService, core_1.ElementRef])
    ], QuizComponent);
    return QuizComponent;
}());
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map