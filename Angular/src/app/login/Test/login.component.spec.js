"use strict";
const login_component_1 = require('../login.component');
const app_component_1 = require('../../app.component');
const testing_1 = require('@angular/core/testing');
const forms_1 = require('@angular/forms');
const testing_2 = require('@angular/router/testing');
const socket_service_1 = require('../../global/socket.service');
const loginObserver_service_1 = require('../loginObserver.service');
const register_component_1 = require("../../register/register.component");
const registerObserver_service_1 = require("../../register/registerObserver.service");
const profile_component_1 = require('../../profile/profile.component');
const quizObserver_service_1 = require("../../home/quizObserver.service");
const home_component_1 = require("../../home/home.component");
const quiz_component_1 = require("../../home/quiz.component");
describe('Application', function () {
    let quizComp;
    let quizfixture;
    let homeComp;
    let homefixture;
    let RegisterComp;
    let profileComp;
    let socketService;
    let LoginComp;
    let loginfixture;
    let AppComp;
    let appfixture;
    let loginService;
    let registerfixture;
    let registerService;
    let quizObserverService;
    let profilefixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule],
            declarations: [login_component_1.LoginComponent, app_component_1.AppComponent, register_component_1.RegisterComponent, profile_component_1.ProfileComponent, home_component_1.HomeComponent, quiz_component_1.QuizComponent],
            providers: [socket_service_1.SocketService, loginObserver_service_1.LoginObserverService, app_component_1.AppComponent, registerObserver_service_1.RegisterObserverService, quizObserver_service_1.QuizObserverService]
        }).compileComponents();
    }));
    beforeEach(() => {
        socketService = new socket_service_1.SocketService();
        loginService = new loginObserver_service_1.LoginObserverService(socketService);
        registerService = new registerObserver_service_1.RegisterObserverService(socketService);
        quizObserverService = new quizObserver_service_1.QuizObserverService(socketService);
        quizfixture = testing_1.TestBed.createComponent(quiz_component_1.QuizComponent);
        quizComp = quizfixture.componentInstance;
        homefixture = testing_1.TestBed.createComponent(home_component_1.HomeComponent);
        homeComp = homefixture.componentInstance;
        profilefixture = testing_1.TestBed.createComponent(profile_component_1.ProfileComponent);
        profileComp = profilefixture.componentInstance;
        registerfixture = testing_1.TestBed.createComponent(register_component_1.RegisterComponent);
        RegisterComp = registerfixture.componentInstance;
        loginfixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
        LoginComp = loginfixture.componentInstance;
        appfixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        AppComp = appfixture.componentInstance;
    });
    /* LOGIN COMPONENT IN LOGIN DIRECTORY*/
    it('should create LoginComponent', () => expect(LoginComp).toBeDefined());
    it('should mock loginObserverService', () => expect(loginService).toBeDefined());
    it('shoud mock socketService', () => expect(socketService).toBeDefined());
    it('should create AppComponent', () => expect(AppComp).toBeDefined());
    it('should successfully login if username and password exist in database', (done) => {
        LoginComp.username = 'doaldoal';
        LoginComp.password = '12341234';
        loginService.login(LoginComp.username, LoginComp.password).subscribe(data => {
            expect(data).toEqual(true);
            done();
        });
    }, 10000);
    /* REGISTER COMPONENT IN REGISTER DIRECTORY */
    it('should create RegsiterComponent', () => expect(RegisterComp).toBeDefined());
    it('should not be able to register if username exists in database', (done) => {
        RegisterComp.username = 'doaldoal';
        RegisterComp.password1 = '56789';
        RegisterComp.password2 = '56789';
        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('Username is already taken.');
            done();
        });
    }, 10000);
    it('should not be able to register if username or passwords are not between 5-20 characters long', (done) => {
        RegisterComp.username = 'doaldoal';
        RegisterComp.password1 = '567';
        RegisterComp.password2 = '567';
        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('Username & Password must be between 5-20 characters long.');
            done();
        });
    }, 10000);
    it('should not be able to register if username or passwords are empty', (done) => {
        RegisterComp.username = '';
        RegisterComp.password1 = '567';
        RegisterComp.password2 = '567';
        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('Please fill out all fields.');
            done();
        });
    }, 10000);
    it('should not be able to register if passwords are not matching', (done) => {
        RegisterComp.username = 'doalfikar';
        RegisterComp.password1 = '45678';
        RegisterComp.password2 = '12334';
        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('The passwords do not match.');
            done();
        });
    }, 10000);
    /* PROFILE COMPONENT IN PROFILE DIRECTORY */
    it('should create ProfileComponent', () => expect(profileComp).toBeDefined());
    /* HOME COMPONENT IN HOME DIRECTORY */
    it('should create HomeComponent', () => expect(homeComp).toBeDefined());
    const input = [{
            ratings: [4, 5]
        }];
    const average = [];
    it('should calculate average rating of input', () => {
        expect(homeComp.calculateAverage(input, average)).toEqual([4.5]);
    });
    /* QUIZ COMPONENT IN HOME DIRECTORY*/
    let duration = 0;
    let stopTimer = false;
    let timers = { 'hours': 0, 'minutes': 0, 'seconds': 0 };
    it('should notify when time is up', () => {
        console.log(quizComp.countdown(duration));
    });
    // HUSK AT TESTE SUBMITQUIZRATING OG SUBMITANSWER 
});
//# sourceMappingURL=login.component.spec.js.map