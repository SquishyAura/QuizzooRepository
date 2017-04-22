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
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var socket_service_1 = require('../global/socket.service');
var QuizObserverService = (function () {
    function QuizObserverService(socketService) {
        this.socketService = socketService;
    }
    QuizObserverService.prototype.getPublicQuizzes = function () {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socketService.socket.emit('getPublicQuizzes', null, function (error, msg) {
                observer.next(msg);
            });
        });
        return observable;
    };
    QuizObserverService.prototype.getQuiz = function (id) {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socketService.socket.emit('getQuiz', JSON.stringify(id), function (error, msg) {
                if (msg.length > 0) {
                    observer.next(msg); //if id exists in database, return the JSON object
                }
                else {
                    observer.next(error); //if id doesn't exist, return error message
                }
            });
        });
        return observable;
    };
    QuizObserverService.prototype.getMyQuizzes = function (currentUser) {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socketService.socket.emit('getMyQuizzes', JSON.stringify(currentUser), function (error, msg) {
                observer.next(msg);
            });
        });
        return observable;
    };
    QuizObserverService.prototype.getQuizStatistics = function (id) {
        var _this = this;
        var observable = new Observable_1.Observable(function (observer) {
            _this.socketService.socket.emit('getQuizStatistics', JSON.stringify(id.split("/")[3]), function (error, msg) {
                observer.next(msg);
            });
        });
        return observable;
    };
    QuizObserverService.prototype.submitQuiz = function (radiobuttons, checkboxes, quizToDisplay, currentUser) {
        var _this = this;
        var submitQuiz = {
            radiobuttons: radiobuttons,
            checkboxes: checkboxes,
            quizToDisplay: quizToDisplay,
            currentUser: currentUser
        };
        var observable = new Observable_1.Observable(function (observer) {
            _this.socketService.socket.emit('submitQuiz', JSON.stringify(submitQuiz), function (error, msg) {
                observer.next(msg);
            });
        });
        return observable;
    };
    QuizObserverService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [socket_service_1.SocketService])
    ], QuizObserverService);
    return QuizObserverService;
}());
exports.QuizObserverService = QuizObserverService;
//# sourceMappingURL=quizObserver.service.js.map