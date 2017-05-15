import { LoginComponent } from '../login.component';
import { AppComponent } from '../../app.component';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { async, ComponentFixture, TestBed, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as io from "socket.io-client";
import { RouterTestingModule } from '@angular/router/testing';
import { SocketService } from '../../global/socket.service';
import { LoginObserverService } from '../loginObserver.service';
import { RegisterComponent } from "../../register/register.component";
import { RegisterObserverService } from "../../register/registerObserver.service";
import { ProfileComponent } from '../../profile/profile.component';
import { QuizObserverService } from "../../home/quizObserver.service";
import { HomeComponent } from "../../home/home.component";
import { QuizComponent } from "../../home/quiz.component";



describe('Application', function () {
    let quizComp: QuizComponent;
    let quizfixture: ComponentFixture<QuizComponent>;
    let homeComp: HomeComponent;
    let homefixture: ComponentFixture<HomeComponent>;
    let RegisterComp: RegisterComponent;
    let profileComp: ProfileComponent;
    let socketService: SocketService;
    let LoginComp: LoginComponent;
    let loginfixture: ComponentFixture<LoginComponent>;
    let AppComp: AppComponent;
    let appfixture: ComponentFixture<AppComponent>;
    let loginService: LoginObserverService;
    let registerfixture: ComponentFixture<RegisterComponent>;
    let registerService: RegisterObserverService;
    let quizObserverService: QuizObserverService;
    let profilefixture: ComponentFixture<ProfileComponent>;



    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [LoginComponent, AppComponent, RegisterComponent, ProfileComponent, HomeComponent, QuizComponent],
            providers: [SocketService, LoginObserverService, AppComponent, RegisterObserverService, QuizObserverService]

        }).compileComponents();
    }));

    beforeEach(() => {
        socketService = new SocketService();
        loginService = new LoginObserverService(socketService);
        registerService = new RegisterObserverService(socketService);
        quizObserverService = new QuizObserverService(socketService);
        quizfixture = TestBed.createComponent(QuizComponent);
        quizComp = quizfixture.componentInstance;
        homefixture = TestBed.createComponent(HomeComponent);
        homeComp = homefixture.componentInstance;
        profilefixture = TestBed.createComponent(ProfileComponent);
        profileComp = profilefixture.componentInstance;
        registerfixture = TestBed.createComponent(RegisterComponent);
        RegisterComp = registerfixture.componentInstance;
        loginfixture = TestBed.createComponent(LoginComponent);
        LoginComp = loginfixture.componentInstance;
        appfixture = TestBed.createComponent(AppComponent);
        AppComp = appfixture.componentInstance;
    });

    /* LOGIN COMPONENT IN LOGIN DIRECTORY*/

    it('should create LoginComponent', () => expect(LoginComp).toBeDefined());

    it('should mock loginObserverService', () => expect(loginService).toBeDefined());

    it('shoud mock socketService', () => expect(socketService).toBeDefined());

    it('should create AppComponent', () => expect(AppComp).toBeDefined());

    it('should successfully login if username and password exist in database', (done: DoneFn) => {

        LoginComp.username = 'doaldoal';
        LoginComp.password = '12341234';

        loginService.login(LoginComp.username, LoginComp.password).subscribe(data => {
            expect(data).toEqual(true);
            done();
        }
        )
    }, 10000);

    /* REGISTER COMPONENT IN REGISTER DIRECTORY */

    it('should create RegsiterComponent', () => expect(RegisterComp).toBeDefined());

    it('should not be able to register if username exists in database', (done: DoneFn) => {
        RegisterComp.username = 'doaldoal';
        RegisterComp.password1 = '56789';
        RegisterComp.password2 = '56789';

        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('Username is already taken.');
            done();
        }
        )
    }, 10000);

    it('should not be able to register if username or passwords are not between 5-20 characters long', (done: DoneFn) => {
        RegisterComp.username = 'doaldoal';
        RegisterComp.password1 = '567';
        RegisterComp.password2 = '567';

        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('Username & Password must be between 5-20 characters long.');
            done();
        }
        )
    }, 10000);

    it('should not be able to register if username or passwords are empty', (done: DoneFn) => {
        RegisterComp.username = '';
        RegisterComp.password1 = '567';
        RegisterComp.password2 = '567';

        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('Please fill out all fields.');
            done();
        }
        )
    }, 10000);

    it('should not be able to register if passwords are not matching', (done: DoneFn) => {
        RegisterComp.username = 'doalfikar';
        RegisterComp.password1 = '45678';
        RegisterComp.password2 = '12334';

        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('The passwords do not match.');
            done();
        }
        )
    }, 10000);

    /* PROFILE COMPONENT IN PROFILE DIRECTORY */

    it('should create ProfileComponent', () => expect(profileComp).toBeDefined());

    /* HOME COMPONENT IN HOME DIRECTORY */

    it('should create HomeComponent', () => expect(homeComp).toBeDefined()); 

    const input = [{
        ratings: [4,5]
    }]
    
    const average: any[] = []; 

    it('should calculate average rating of input', () => {
       expect(homeComp.calculateAverage(input, average)).toEqual([4.5]); 
    }) 

    /* QUIZ COMPONENT IN HOME DIRECTORY*/

    let duration = 0;
    let stopTimer : boolean = false;
    let timers = {'hours': 0, 'minutes': 0, 'seconds': 0};

    it('should notify when time is up', () =>{
        console.log(quizComp.countdown(duration))
    })

    
    
    
    
    // HUSK AT TESTE SUBMITQUIZRATING OG SUBMITANSWER 


});


