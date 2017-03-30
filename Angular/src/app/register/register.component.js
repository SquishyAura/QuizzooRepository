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
var socket_service_1 = require('../global/socket.service');
var router_1 = require('@angular/router');
var RegisterComponent = (function () {
    function RegisterComponent(socketService, router) {
        this.socketService = socketService;
        this.router = router;
        this.name = 'Angular';
    }
    RegisterComponent.prototype.registerAccount = function () {
        var register = {
            username: this.username,
            password1: this.password1,
            password2: this.password2,
        };
        this.socketService.socket.emit('register', JSON.stringify(register));
    };
    RegisterComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('user')) {
            this.router.navigateByUrl('/home');
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register-app',
            templateUrl: 'register.component.html',
        }), 
        __metadata('design:paramtypes', [socket_service_1.SocketService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map