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
var quizObserver_service_1 = require('./quizObserver.service');
var HomeComponent = (function () {
    function HomeComponent(quizObserverService) {
        this.quizObserverService = quizObserverService;
        this.quizzesToDisplay = [];
        this.quizAverage = [];
        console.log("Logged in as " + localStorage.getItem('user'));
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service = this.quizObserverService.getPublicQuizzes().subscribe(function (data) {
            _this.quizzesToDisplay = data;
            //calculate average rating of each quiz
            for (var i = 0; i < _this.quizzesToDisplay.length; i++) {
                var sum = 0;
                if (_this.quizzesToDisplay[i].ratings.length == 0) {
                    _this.quizAverage[i] = "Not rated yet.";
                }
                else {
                    for (var j = 0; j < _this.quizzesToDisplay[i].ratings.length; j++) {
                        sum = sum + _this.quizzesToDisplay[i].ratings[j];
                    }
                    var average = sum / _this.quizzesToDisplay[i].ratings.length;
                    _this.quizAverage[i] = Math.round(average * 10) / 10; //max 1 decimal
                }
            }
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.service.unsubscribe();
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-app',
            templateUrl: 'home.component.html',
        }), 
        __metadata('design:paramtypes', [quizObserver_service_1.QuizObserverService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map