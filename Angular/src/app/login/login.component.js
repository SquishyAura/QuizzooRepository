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
const socket_service_1 = require('../global/socket.service');
const router_1 = require('@angular/router');
const loginObserver_service_1 = require('./loginObserver.service');
const app_component_1 = require('../app.component');
let LoginComponent = class LoginComponent {
    constructor(socketService, router, loginObserverService, appComponent) {
        this.socketService = socketService;
        this.router = router;
        this.loginObserverService = loginObserverService;
        this.appComponent = appComponent;
    }
    loginAccount() {
        this.service = this.loginObserverService.login(this.username, this.password).subscribe(data => {
            if (data == true) {
                localStorage.setItem('user', this.username);
                this.appComponent.popUpFade("You have successfully logged in.");
                console.log('logged in');
                this.loginObserverService.user = true;
                this.loginObserverService.guest = false;
                this.router.navigateByUrl('/home');
                return true;
            }
            else {
                console.log("hej");
                this.appComponent.popUpFade("Incorrect account information.");
                return false;
            }
        });
    }
    ngOnInit() {
        if (localStorage.getItem('user')) {
        }
    }
};
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login-app',
        templateUrl: 'login.component.html',
    }), 
    __metadata('design:paramtypes', [socket_service_1.SocketService, router_1.Router, loginObserver_service_1.LoginObserverService, app_component_1.AppComponent])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map