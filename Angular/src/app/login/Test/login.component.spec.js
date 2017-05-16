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
const template_component_1 = require("../../template/template.component");
const question_component_1 = require("../../template/question.component");
const answer_component_1 = require("../../template/answer.component");
describe('Application', function () {
    let answerComp;
    let answerfixture;
    let questionComp;
    let questionfixture;
    let templateComp;
    let templatefixture;
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
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [login_component_1.LoginComponent, app_component_1.AppComponent, register_component_1.RegisterComponent, profile_component_1.ProfileComponent, home_component_1.HomeComponent, quiz_component_1.QuizComponent, template_component_1.TemplateComponent, question_component_1.QuestionComponent, answer_component_1.AnswerComponent],
            providers: [socket_service_1.SocketService, loginObserver_service_1.LoginObserverService, app_component_1.AppComponent, registerObserver_service_1.RegisterObserverService, quizObserver_service_1.QuizObserverService]
        }).compileComponents();
    }));
    beforeEach(() => {
        socketService = new socket_service_1.SocketService();
        loginService = new loginObserver_service_1.LoginObserverService(socketService);
        registerService = new registerObserver_service_1.RegisterObserverService(socketService);
        quizObserverService = new quizObserver_service_1.QuizObserverService(socketService);
        answerfixture = testing_1.TestBed.createComponent(answer_component_1.AnswerComponent);
        answerComp = answerfixture.componentInstance;
        questionfixture = testing_1.TestBed.createComponent(question_component_1.QuestionComponent);
        questionComp = questionfixture.componentInstance;
        templatefixture = testing_1.TestBed.createComponent(template_component_1.TemplateComponent);
        templateComp = templatefixture.componentInstance;
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
    /*
    * LOGIN COMPONENT IN LOGIN DIRECTORY
    */
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
    }, 60000);
    /*
    * REGISTER COMPONENT IN REGISTER DIRECTORY
    */
    it('should create RegsiterComponent', () => expect(RegisterComp).toBeDefined());
    it('should not be able to register if username exists in database', (done) => {
        RegisterComp.username = 'doaldoal';
        RegisterComp.password1 = '56789';
        RegisterComp.password2 = '56789';
        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('Username is already taken.');
            done();
        });
    }, 60000);
    it('should not be able to register if username or passwords are not between 5-20 characters long', (done) => {
        RegisterComp.username = 'doaldoal';
        RegisterComp.password1 = '567';
        RegisterComp.password2 = '567';
        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('Username & Password must be between 5-20 characters long.');
            done();
        });
    }, 60000);
    it('should not be able to register if username or passwords are empty', (done) => {
        RegisterComp.username = '';
        RegisterComp.password1 = '567';
        RegisterComp.password2 = '567';
        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('Please fill out all fields.');
            done();
        });
    }, 60000);
    it('should not be able to register if passwords are not matching', (done) => {
        RegisterComp.username = 'doalfikar';
        RegisterComp.password1 = '45678';
        RegisterComp.password2 = '12334';
        registerService.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => {
            expect(data).toEqual('The passwords do not match.');
            done();
        });
    }, 60000);
    /*
    * PROFILE COMPONENT IN PROFILE DIRECTORY
    */
    it('should create ProfileComponent', () => expect(profileComp).toBeDefined());
    /*
    * HOME COMPONENT IN HOME DIRECTORY
    */
    it('should create HomeComponent', () => expect(homeComp).toBeDefined());
    const input = [{
            ratings: [4, 5]
        }];
    const average = [];
    it('should calculate average rating of input', () => {
        expect(homeComp.calculateAverage(input, average)).toEqual([4.5]);
    });
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
        questionsText.setValue("What is 5 + 2?");
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
//# sourceMappingURL=login.component.spec.js.map