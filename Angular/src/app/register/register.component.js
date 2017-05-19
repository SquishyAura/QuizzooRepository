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
const registerObserver_service_1 = require('./registerObserver.service');
const app_component_1 = require('../app.component');
let RegisterComponent = class RegisterComponent {
    constructor(router, registerObserverService, appComponent) {
        this.router = router;
        this.registerObserverService = registerObserverService;
        this.appComponent = appComponent;
    }
    registerAccount() {
        this.service = this.registerObserverService.register(this.username, this.password1, this.password2).subscribe((data) => {
            if (data == true) {
                this.appComponent.popUpFade("You have successfully registered!");
                return true;
            }
            else {
                this.appComponent.popUpFade(data);
                return false;
            }
        });
    }
    ngOnInit() {
        if (localStorage.getItem('user')) {
            this.router.navigateByUrl('/home');
        }
    }
};
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'register-app',
        templateUrl: 'register.component.html',
    }), 
    __metadata('design:paramtypes', [router_1.Router, registerObserver_service_1.RegisterObserverService, app_component_1.AppComponent])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map