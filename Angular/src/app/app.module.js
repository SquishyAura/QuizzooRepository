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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require("@angular/forms");
var app_component_1 = require('./app.component');
var welcome_component_1 = require('./welcome/welcome.component');
var login_component_1 = require('./login/login.component');
var register_component_1 = require('./register/register.component');
var home_component_1 = require('./home/home.component');
var template_component_1 = require('./template/template.component');
var question_component_1 = require('./template/question.component');
var answer_component_1 = require('./template/answer.component');
var socket_service_1 = require('./global/socket.service');
var auth_service_1 = require('./global/auth.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot([
                    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
                    { path: 'welcome', component: welcome_component_1.WelcomeComponent },
                    { path: 'login', component: login_component_1.LoginComponent },
                    { path: 'register', component: register_component_1.RegisterComponent },
                    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_service_1.AuthService] },
                    { path: 'template', component: template_component_1.TemplateComponent, canActivate: [auth_service_1.AuthService] },
                ])
            ],
            declarations: [app_component_1.AppComponent,
                welcome_component_1.WelcomeComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                home_component_1.HomeComponent,
                template_component_1.TemplateComponent,
                question_component_1.QuestionComponent,
                answer_component_1.AnswerComponent,
            ],
            providers: [socket_service_1.SocketService,
                auth_service_1.AuthService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map