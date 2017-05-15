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
const quizObserver_service_1 = require('../home/quizObserver.service');
const socket_service_1 = require('../global/socket.service');
let ProfileComponent = class ProfileComponent {
    constructor(router, quizObserverService, socketService, elementRef) {
        this.router = router;
        this.quizObserverService = quizObserverService;
        this.socketService = socketService;
        this.elementRef = elementRef;
        this.currentUser = localStorage.getItem('user');
    }
    ngOnInit() {
        this.service = this.quizObserverService.getMyQuizzes(localStorage.getItem('user')).subscribe(data => {
            this.myQuizzes = data;
        });
    }
};
ProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'profile-app',
        templateUrl: 'profile.component.html',
    }), 
    __metadata('design:paramtypes', [router_1.Router, quizObserver_service_1.QuizObserverService, socket_service_1.SocketService, core_1.ElementRef])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map