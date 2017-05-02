"use strict";
const login_component_1 = require('../login.component');
const app_component_1 = require('../../app.component');
const testing_1 = require('@angular/core/testing');
const forms_1 = require('@angular/forms');
const testing_2 = require('@angular/router/testing');
const socket_service_1 = require('../../global/socket.service');
describe('LoginComponent', function () {
    let de;
    let socketService;
    let LoginComp;
    let loginfixture;
    let AppComp;
    let appfixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule,
                forms_1.FormsModule],
            declarations: [login_component_1.LoginComponent, app_component_1.AppComponent],
            providers: [socket_service_1.SocketService]
        }).compileComponents();
    }));
    beforeEach(() => {
        loginfixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
        LoginComp = loginfixture.componentInstance;
        appfixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        AppComp = appfixture.componentInstance;
    });
    it('should create component', () => expect(LoginComp).toBeDefined());
    it('should fail to login', () => {
        LoginComp.username = 'doaldoal';
        LoginComp.password = '12341234';
        //expect(LoginComp.username).toBe('adawdawd');
        //expect(LoginComp.password).toBe('awdawdawd');
        console.log(LoginComp.username);
        LoginComp.loginAccount().then(function (AppComp, loginSuccess = ()) {
        });
        console.log(AppComp.loginSuccess());
        expect(AppComp.loginSuccess()).toBe(true);
    });
});
//# sourceMappingURL=login.component.spec.js.map