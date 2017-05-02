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
const Observable_1 = require('rxjs/Observable');
const core_1 = require('@angular/core');
const socket_service_1 = require('../global/socket.service');
let RegisterObserverService = class RegisterObserverService {
    constructor(socketService) {
        this.socketService = socketService;
    }
    register(username, password1, password2) {
        var register = {
            username: username,
            password1: password1,
            password2: password2
        };
        let observable = new Observable_1.Observable((observer) => {
            this.socketService.socket.emit('register', JSON.stringify(register), function (error, msg) {
                observer.next(msg);
            });
        });
        return observable;
    }
};
RegisterObserverService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [socket_service_1.SocketService])
], RegisterObserverService);
exports.RegisterObserverService = RegisterObserverService;
//# sourceMappingURL=registerObserver.service.js.map