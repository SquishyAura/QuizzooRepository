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
const router_1 = require('@angular/router');
const quizObserver_service_1 = require('./quizObserver.service');
const socket_service_1 = require('../global/socket.service');
const app_component_1 = require('../app.component');
let QuizComponent = class QuizComponent {
    constructor(router, quizObserverService, socketService, elementRef, app) {
        this.router = router;
        this.quizObserverService = quizObserverService;
        this.socketService = socketService;
        this.elementRef = elementRef;
        this.app = app;
        this.feedbackArray = [];
        this.submitted = false;
        this.timers = { 'hours': 0, 'minutes': 0, 'seconds': 0 };
        this.stopTimer = false;
        this.currentUser = localStorage.getItem('user');
    }
    ngOnInit() {
        this.service = this.quizObserverService.getQuiz(this.router.url).subscribe(data => {
            //console.log(data);
            this.quizToDisplay = data;
            if (data[0].duration != 'Unlimited') {
                this.countdown(data[0].duration * 60);
            }
        });
    }
    ngOnDestroy() {
        this.service.unsubscribe();
        this.stopTimer = true;
    }
    deleteQuiz(id) {
        this.socketService.socket.emit('deleteQuiz', JSON.stringify(id));
        setTimeout(() => this.router.navigateByUrl('/home'), 1000);
        this.app.popUpFade("Quiz has been deleted.");
    }
    countdown(duration) {
        if (this.stopTimer == false) {
            if (duration > 0) {
                duration--;
                this.timers['seconds'] = duration % 60;
                this.timers['minutes'] = Math.trunc((duration / 60) % 60);
                this.timers['hours'] = Math.trunc((duration / 60 / 60) % 24);
                setTimeout(() => {
                    if (this.submitted == false) {
                        this.countdown(duration);
                    }
                }, 1000);
            }
            else {
                this.submitAnswer(); //submit answer if timer reached 0
                this.app.popUpFade("Time has run out. Your answers were submitted.");
            }
        }
    }
    routeToStatisticsPage() {
        this.router.navigateByUrl(this.router.url + '/statistics');
    }
    showQuizRating() {
        let quizPanel = this.elementRef.nativeElement.querySelector('.quizRatingPanel');
        quizPanel.style.opacity = 1;
        quizPanel.style.pointerEvents = "auto";
        let quizBackground = this.elementRef.nativeElement.querySelector('.quizRatingBackground');
        quizBackground.style.opacity = 0.7;
        quizBackground.style.pointerEvents = "auto";
    }
    closeQuizRating() {
        let quizPanel = this.elementRef.nativeElement.querySelector('.quizRatingPanel');
        quizPanel.style.opacity = 0;
        quizPanel.style.pointerEvents = "none";
        let quizBackground = this.elementRef.nativeElement.querySelector('.quizRatingBackground');
        quizBackground.style.opacity = 0;
        quizBackground.style.pointerEvents = "none";
    }
    submitQuizRating(value) {
        let ratings = this.elementRef.nativeElement.getElementsByClassName('ratings');
        let ratingsCheck = [];
        for (let i = 0; i < ratings.length; i++) {
            ratingsCheck.push(ratings[i].checked);
        }
        let storeRating = {
            ratingsCheck: ratingsCheck,
            id: this.router.url.split("/")[3]
        };
        this.socketService.socket.emit('rating', JSON.stringify(storeRating));
        this.closeQuizRating();
        this.app.popUpFade("Your rating has been saved.");
    }
    submitAnswer() {
        let radiobuttons = this.elementRef.nativeElement.getElementsByClassName('radiobuttons');
        let checkboxes = this.elementRef.nativeElement.getElementsByClassName('checkboxes');
        let radiobuttonsCheck = [];
        let checkboxesCheck = [];
        for (let i = 0; i < radiobuttons.length; i++) {
            radiobuttonsCheck.push(radiobuttons[i].checked);
        }
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxesCheck.push(checkboxes[i].checked);
        }
        this.service = this.quizObserverService.submitQuiz(radiobuttonsCheck, checkboxesCheck, this.quizToDisplay, this.currentUser).subscribe((data) => {
            this.feedbackArray = data.feedbackArray;
            this.submitted = true;
            this.app.popUpFade("Your answers have been submitted.");
        });
    }
};
QuizComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'quiz-app',
        templateUrl: 'quiz.component.html',
    }), 
    __metadata('design:paramtypes', [router_1.Router, quizObserver_service_1.QuizObserverService, socket_service_1.SocketService, core_1.ElementRef, app_component_1.AppComponent])
], QuizComponent);
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map