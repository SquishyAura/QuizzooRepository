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
var socket_service_1 = require('./global/socket.service');
var AppComponent = (function () {
    function AppComponent(socketService, router) {
        var _this = this;
        this.socketService = socketService;
        this.router = router;
        this.name = 'Angular';
        this.popUpOpacity = 0;
        this.popUpDisplay = "none";
        this.popUpInnerHTML = "";
        this.fade = function () {
            if ((_this.popUpOpacity -= .01) <= 0) {
                _this.popUpDisplay = "none";
                _this.popUpOpacity = 0;
            }
            else {
                requestAnimationFrame(_this.fade);
            }
        };
        socketService.socket.on('connect', function () {
            console.log("connected!");
        });
        socketService.socket.on('disconnect', function () {
            console.log("disconnected!");
        });
        socketService.socket.on('registerError', function (msg) {
            var _this = this;
            var incomingMsg = JSON.parse(msg);
            if (incomingMsg.passwordNotMatching == true) {
                this.popUpFade("The passwords do not match.");
            }
            if (incomingMsg.usernameTaken == true) {
                this.popUpFade("Username is already taken.");
            }
            if (incomingMsg.fieldsEmpty == true) {
                this.popUpFade("Please fill out all fields.");
            }
            if (incomingMsg.invalidLength == true) {
                this.popUpFade("Username & Password must be between 5-20 characters long.");
            }
            if (incomingMsg.correctRegister == true) {
                this.popUpFade("You have successfully registered! Redirecting to the login page.");
                setTimeout(function () { return _this.router.navigateByUrl('/login'); }, 3000); //redirects to login page after 3 seconds
            }
        }.bind(this));
        socketService.socket.on('loginError', function (msg) {
            var incomingMsg = JSON.parse(msg);
            if (incomingMsg.incorrectAccount == true) {
                this.popUpFade("Incorrect account information.");
            }
        }.bind(this));
        socketService.socket.on('loginSuccess', function (msg) {
            var incomingMsg = JSON.parse(msg);
            if (incomingMsg.correctAccount == true) {
                localStorage.setItem('user', JSON.stringify(incomingMsg.username));
                this.popUpFade("You have successfully logged in.");
                this.user = true;
                this.guest = false;
                this.router.navigateByUrl('/home');
            }
        }.bind(this));
    }
    AppComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('user') === null) {
            this.user = false;
            this.guest = true;
        }
        else if (localStorage.getItem('user') !== null) {
            this.guest = false;
            this.user = true;
        }
    };
    AppComponent.prototype.popUpFade = function (input) {
        var _this = this;
        if (this.popUpOpacity == 0) {
            this.popUpDisplay = "table";
            this.popUpOpacity = 0.7;
            this.popUpInnerHTML = input;
            setTimeout(function () { return _this.fade(); }, 2000); //popup box fades away after 1 seconds
        }
    };
    AppComponent.prototype.logoutAccount = function () {
        localStorage.removeItem('user');
        this.user = false;
        this.guest = true;
        this.popUpFade("Logged out.");
        this.router.navigateByUrl('/login');
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
        }), 
        __metadata('design:paramtypes', [socket_service_1.SocketService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map