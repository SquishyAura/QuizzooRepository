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
        this.correctAnswerMultipleChoice = [];
        this.submitted = false;
        this.timers = { 'hours': 0, 'minutes': 0, 'seconds': 0 };
        this.currentUser = localStorage.getItem('user');
    }
    QuizComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service = this.quizObserverService.getQuiz(this.router.url).subscribe(function (data) {
            console.log(data);
            _this.quizToDisplay = data;
            if (_this.quizToDisplay[0].duration != 'Unlimited') {
                _this.duration = _this.quizToDisplay[0].duration * 60; //in seconds
                _this.countdown();
            }
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
        var radiobuttons = this.elementRef.nativeElement.getElementsByClassName('answerClass');
        this.correctAnswerMultipleChoice = [];
        var k = 0;
        for (var i = 0; i < this.quizToDisplay[0].questions.length; i++) {
            if (this.quizToDisplay[0].questions[i].types == "Multiple-choice") {
                var isCorrect = false;
                for (var j = 0; j < this.quizToDisplay[0].questions[i].answers.length; j++) {
                    if (radiobuttons[k].checked == true && this.quizToDisplay[0].questions[i].answers[j].correctAnswer === 'Correct') {
                        isCorrect = true;
                    }
                    k++;
                }
                if (isCorrect == true) {
                    this.correctAnswerMultipleChoice.push('Correct');
                }
                else {
                    this.correctAnswerMultipleChoice.push('Incorrect');
                }
            }
        }
    };
    QuizComponent.prototype.countdown = function () {
        var _this = this;
        if (this.duration > 0) {
            this.duration--;
            this.timers['seconds'] = this.duration % 60;
            this.timers['minutes'] = Math.trunc((this.duration / 60) % 60);
            this.timers['hours'] = Math.trunc((this.duration / 60 / 60) % 24);
            setTimeout(function () { if (_this.submitted == false) {
                _this.countdown();
            } }, 1000);
        }
        else {
            this.submitAnswer();
        }
    };
    QuizComponent.prototype.submitAnswer = function () {
        this.submitted = true;
        this.handleMultiplechoiceAnswer();
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