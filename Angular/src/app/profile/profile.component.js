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
var quizObserver_service_1 = require('../home/quizObserver.service');
var socket_service_1 = require('../global/socket.service');
var ProfileComponent = (function () {
    function ProfileComponent(router, quizObserverService, socketService, elementRef) {
        this.router = router;
        this.quizObserverService = quizObserverService;
        this.socketService = socketService;
        this.elementRef = elementRef;
        this.currentUser = localStorage.getItem('user');
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service = this.quizObserverService.getMyQuizzes(localStorage.getItem('user')).subscribe(function (data) {
            _this.myQuizzes = data;
        });
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        this.service.unsubscribe();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'profile-app',
            templateUrl: 'profile.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, quizObserver_service_1.QuizObserverService, socket_service_1.SocketService, core_1.ElementRef])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map