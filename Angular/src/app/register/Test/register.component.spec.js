"use strict";
const register_component_1 = require('../register.component');
const app_component_1 = require('../../app.component');
const testing_1 = require('@angular/core/testing');
const forms_1 = require('@angular/forms');
const testing_2 = require('@angular/router/testing');
const socket_service_1 = require('../../global/socket.service');
const registerObserver_service_1 = require('../registerObserver.service');
describe('RegisterComponent', function () {
    let socketService;
    let RegisterComp;
    let registerfixture;
    let AppComp;
    let appfixture;
    let service;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule, forms_1.FormsModule],
            declarations: [register_component_1.RegisterComponent, app_component_1.AppComponent],
            providers: [socket_service_1.SocketService, registerObserver_service_1.RegisterObserverService, app_component_1.AppComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        socketService = new socket_service_1.SocketService();
        service = new registerObserver_service_1.RegisterObserverService(socketService);
        registerfixture = testing_1.TestBed.createComponent(register_component_1.RegisterComponent);
        RegisterComp = registerfixture.componentInstance;
        appfixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        AppComp = appfixture.componentInstance;
    });
    it('should create component', () => {
        expect(RegisterComp).toBeDefined();
    });
    /*it('should not be able to register if username exists in database', (done: DoneFn) => {
        RegisterComp.username = 'doaldoal';
        RegisterComp.password1 = '6789';
        RegisterComp.password2 = '6789';

        service.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data =>
            {
                expect(data).toEqual(true);
                done();
            }
        )
    });*/
});
//# sourceMappingURL=register.component.spec.js.map