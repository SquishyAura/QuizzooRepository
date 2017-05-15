"use strict";
const login_component_1 = require('../login.component');
const app_component_1 = require('../../app.component');
const testing_1 = require('@angular/core/testing');
const forms_1 = require('@angular/forms');
const testing_2 = require('@angular/router/testing');
const socket_service_1 = require('../../global/socket.service');
const loginObserver_service_1 = require('../loginObserver.service');
describe('LoginComponent', function () {
    let socketService;
    let LoginComp;
    let loginfixture;
    let AppComp;
    let appfixture;
    let service;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule],
            declarations: [login_component_1.LoginComponent, app_component_1.AppComponent],
            providers: [socket_service_1.SocketService, loginObserver_service_1.LoginObserverService, app_component_1.AppComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        socketService = new socket_service_1.SocketService();
        service = new loginObserver_service_1.LoginObserverService(socketService);
        loginfixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
        LoginComp = loginfixture.componentInstance;
        appfixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        AppComp = appfixture.componentInstance;
    });
    it('should create LoginComponent', () => expect(LoginComp).toBeDefined());
    it('should mock loginObserverService', () => expect(service).toBeDefined());
    it('shoud mock socketService', () => expect(socketService).toBeDefined());
    it('should create AppComponent', () => expect(AppComp).toBeDefined());
    it('should successfully login if username and password exist in database', (done) => {
        LoginComp.username = 'doaldoal';
        LoginComp.password = '12341234';
        service.login(LoginComp.username, LoginComp.password).subscribe(data => {
            expect(data).toEqual(true);
            done();
        });
    });
});
//# sourceMappingURL=login.component.spec.js.map