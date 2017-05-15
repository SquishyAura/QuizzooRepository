import { LoginComponent } from '../login.component';
import { AppComponent } from '../../app.component';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { async, ComponentFixture, TestBed, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TemplateComponent } from "../../template/template.component";
import { QuestionComponent } from "../../template/question.component";
import { AnswerComponent } from "../../template/answer.component";

describe('Application', function () {
    let answerComp: AnswerComponent;
    let answerfixture: ComponentFixture<AnswerComponent>;
    let questionComp: QuestionComponent;
    let questionfixture: ComponentFixture<QuestionComponent>;
    let templateComp: TemplateComponent;
    let templatefixture: ComponentFixture<TemplateComponent>;
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
            imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
            declarations: [LoginComponent, AppComponent, RegisterComponent, ProfileComponent, HomeComponent, QuizComponent, TemplateComponent, QuestionComponent,  AnswerComponent],
            providers: [SocketService, LoginObserverService, AppComponent, RegisterObserverService, QuizObserverService]

        }).compileComponents();
    }));

    beforeEach(() => {
        socketService = new SocketService();
        loginService = new LoginObserverService(socketService);
        registerService = new RegisterObserverService(socketService);
        quizObserverService = new QuizObserverService(socketService);
        answerfixture = TestBed.createComponent(AnswerComponent);
        answerComp = answerfixture.componentInstance;
        questionfixture = TestBed.createComponent(QuestionComponent);
        questionComp = questionfixture.componentInstance;
        templatefixture = TestBed.createComponent(TemplateComponent);
        templateComp = templatefixture.componentInstance;
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

    /* 
    * LOGIN COMPONENT IN LOGIN DIRECTORY
    */

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

    /* 
    * REGISTER COMPONENT IN REGISTER DIRECTORY 
    */

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

    /* 
    * PROFILE COMPONENT IN PROFILE DIRECTORY 
    */

    it('should create ProfileComponent', () => expect(profileComp).toBeDefined());

    /* 
    * HOME COMPONENT IN HOME DIRECTORY 
    */

    it('should create HomeComponent', () => expect(homeComp).toBeDefined()); 

    const input = [{
        ratings: [4,5]
    }]
    
    const average: any[] = []; 

    it('should calculate average rating of input', () => {
       expect(homeComp.calculateAverage(input, average)).toEqual([4.5]); 
    }) 

    /* 
    * TEMPLATE COMPONENT IN TEMPLATE DIRECTORY 
    */
    it('should create TemplateComponent', () => expect(templateComp).toBeDefined());

    it('should create QuestionComponent', () => expect(questionComp).toBeDefined());

    it('should create AnswerComponent', () => expect(answerComp).toBeDefined());

    it('form invalid when empty', () => {
        templateComp.ngOnInit();
        expect(templateComp.myForm.valid).toBeFalsy();
    });
    
    it('should invalidate title as its length is not between 5 to 20 characters', () => {
        templateComp.ngOnInit();
        let title = templateComp.myForm.controls['title'];
        expect(title.valid).toBeFalsy();
    });
    
    it('should validate title as its length is between 5 to 20 charaters', () => {
        templateComp.ngOnInit();
        let title = templateComp.myForm.controls['title'];
        title.setValue("Math quiz");
        expect(title.valid).toBeTruthy();
    });

    it('should invalidate access as no option has been chosen', () => {
        templateComp.ngOnInit();
        let access = templateComp.myForm.controls['access'];
        expect(access.valid).toBeFalsy();
    });

    it('should validate access as an option has been chosen', () => {
        templateComp.ngOnInit();
        let access = templateComp.myForm.controls['access'];
        access.setValue("Public");
        expect(access.valid).toBeTruthy();
    });

    it('should invalidate duration as no duration has been chosen', () => {
        templateComp.ngOnInit();
        let duration = templateComp.myForm.controls['duration'];
        expect(duration.valid).toBeFalsy();
    });

    it('should validate duration as an option has been chosen', () => {
        templateComp.ngOnInit();
        let duration = templateComp.myForm.controls['duration'];
        duration.setValue("1");
        expect(duration.valid).toBeTruthy();
    });

    it('should invalidate question text as its length is less than 10 characters', () => {
        templateComp.ngOnInit();
        let questionText = templateComp.myForm.get('questions.0.questionText');
        expect(questionText.valid).toBeFalsy();
    });

    it('should validate question text as its length is 10 characters or more', () => {
        templateComp.ngOnInit();
        let questionsText = templateComp.myForm.get('questions.0.questionText');
        questionsText.setValue("What is 5 + 2?")
        expect(questionsText.valid).toBeTruthy();
    });

    it('should invalidate question type as no type has been chosen', () => {
        templateComp.ngOnInit();
        let type = templateComp.myForm.get('questions.0.types');
        expect(type.valid).toBeFalsy();
    });

    it('should validate question type as a type has been chosen', () => {
        templateComp.ngOnInit();
        let type = templateComp.myForm.get('questions.0.types');
        type.setValue("Multiple-choice");
        expect(type.valid).toBeTruthy();
    });

    it('should invalidate answer text as its length is less than 1 character', () => {
        templateComp.ngOnInit();
        let answerText = templateComp.myForm.get('questions.0.answers.0.answerText');
        expect(answerText.valid).toBeFalsy();
    });

    it('should validate answer text as its length is 1 character or more', () => {
        templateComp.ngOnInit();
        let answerText = templateComp.myForm.get('questions.0.answers.0.answerText');
        answerText.setValue("7");
        expect(answerText.valid).toBeTruthy();
    });

    it('should invalidate correctAnswer as a Correct/Incorrect value has not been chosen', () => {
        templateComp.ngOnInit();
        let correctAnswer = templateComp.myForm.get('questions.0.answers.0.correctAnswer');
        expect(correctAnswer.valid).toBeFalsy();
    });

    it('should validate correctAnswer as a Correct/Incorrect value has been chosen', () => {
        templateComp.ngOnInit();
        let correctAnswer = templateComp.myForm.get('questions.0.answers.0.correctAnswer');
        correctAnswer.setValue("Correct");
        expect(correctAnswer.valid).toBeTruthy();
    });

    it('should add a new question', () => {
        templateComp.ngOnInit();
        let questionAmountBeforeAdding = templateComp.myForm.controls['questions'].value.length;
        templateComp.addQuestion();
        let questionAmountAfterAdding = templateComp.myForm.controls['questions'].value.length;
        expect(questionAmountAfterAdding).toBeGreaterThan(questionAmountBeforeAdding);
    });

    it('should remove a question', () => {
        templateComp.ngOnInit();
        let questionAmountBeforeRemoving = templateComp.myForm.controls['questions'].value.length;
        templateComp.removeQuestion(0); //removes question with index 0
        let questionAmountAfterRemoving = templateComp.myForm.controls['questions'].value.length;
        expect(questionAmountBeforeRemoving).toBeGreaterThan(questionAmountAfterRemoving);
    });

    it('should add a new answer', () => {
        templateComp.ngOnInit();
        let answerAmountBeforeAdding = templateComp.myForm.get('questions.0.answers').value.length;
        templateComp.addAnswer(0); //adds answer to question with index 0
        let answerAmountAfterAdding = templateComp.myForm.get('questions.0.answers').value.length;
        expect(answerAmountAfterAdding).toBeGreaterThan(answerAmountBeforeAdding);
    });

    it('should remove an answer', () => {
        templateComp.ngOnInit();
        let answerAmountBeforeRemoving = templateComp.myForm.get('questions.0.answers').value.length;
        templateComp.removeAnswer(0, 0); //removes answer with index 0 at question with index 0
        let answerAmountAfterRemoving = templateComp.myForm.get('questions.0.answers').value.length;
        expect(answerAmountBeforeRemoving).toBeGreaterThan(answerAmountAfterRemoving);
    });

    it('should validate form', () => {
        templateComp.ngOnInit();
        templateComp.myForm.controls['title'].setValue("Math quiz");
        templateComp.myForm.controls['access'].setValue("Public");
        templateComp.myForm.controls['duration'].setValue("1");
        templateComp.myForm.get('questions.0.questionText').setValue("What is 5 + 2?");
        templateComp.myForm.get('questions.0.types').setValue("Multiple-choice");
        templateComp.myForm.get('questions.0.answers.0.answerText').setValue("7");
        templateComp.myForm.get('questions.0.answers.0.correctAnswer').setValue("Correct");
        expect(templateComp.myForm.valid).toBeTruthy();
    });
});


