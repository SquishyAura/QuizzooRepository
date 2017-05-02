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
const quizObserver_service_1 = require('./quizObserver.service');
const router_1 = require('@angular/router');
let QuizStatisticsComponent = class QuizStatisticsComponent {
    constructor(quizObserverService, router) {
        this.quizObserverService = quizObserverService;
        this.router = router;
        this.combinedAnswers = [];
    }
    ngOnInit() {
        this.service = this.quizObserverService.getQuizStatistics(this.router.url).subscribe((data) => {
            this.statisticsToDisplay = data;
            this.getCombinedNumberOfAnswers();
        });
    }
    getCombinedNumberOfAnswers() {
        let index = 0;
        for (let i = 0; i < this.statisticsToDisplay[0].questions.length; i++) {
            this.combinedAnswers[index] = 0;
            for (let j = 0; j < this.statisticsToDisplay[0].questions[i].answers.length; j++) {
                let numberOfClicks = parseInt(this.statisticsToDisplay[0].questions[i].answers[j].numberOfClicks);
                this.combinedAnswers[index] = this.combinedAnswers[index] + numberOfClicks;
            }
            index++;
        }
    }
    ngOnDestroy() {
        this.service.unsubscribe();
    }
    routeBackToQuiz() {
        this.router.navigateByUrl('/home/quiz/' + this.router.url.split("/")[3]);
    }
};
QuizStatisticsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'quizStatistics-app',
        templateUrl: 'quizStatistics.component.html',
    }), 
    __metadata('design:paramtypes', [quizObserver_service_1.QuizObserverService, router_1.Router])
], QuizStatisticsComponent);
exports.QuizStatisticsComponent = QuizStatisticsComponent;
//# sourceMappingURL=quizStatistics.component.js.map