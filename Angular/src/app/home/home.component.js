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
let HomeComponent = class HomeComponent {
    constructor(quizObserverService) {
        this.quizObserverService = quizObserverService;
        this.quizzesToDisplay = [];
        this.quizAverage = [];
        console.log("Logged in as " + localStorage.getItem('user'));
    }
    ngOnInit() {
        this.service = this.quizObserverService.getPublicQuizzes().subscribe(data => {
            this.quizzesToDisplay = data;
            this.calculateAverage(data, this.quizAverage);
        });
    }
    calculateAverage(input, output) {
        //calculate average rating of each quiz
        for (let i = 0; i < input.length; i++) {
            let sum = 0;
            if (input[i].ratings.length == 0) {
                output[i] = "Not rated yet.";
            }
            else {
                for (let j = 0; j < input[i].ratings.length; j++) {
                    sum = sum + input[i].ratings[j];
                }
                let average = sum / input[i].ratings.length;
                output[i] = Math.round(average * 10) / 10; //max 1 decimal
            }
        }
        return output;
    }
};
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home-app',
        templateUrl: 'home.component.html',
    }), 
    __metadata('design:paramtypes', [quizObserver_service_1.QuizObserverService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map