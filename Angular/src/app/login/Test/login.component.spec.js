"use strict";
const login_component_1 = require('../login.component');
const testing_1 = require('@angular/core/testing');
const forms_1 = require('@angular/forms');
const testing_2 = require('@angular/router/testing');
const socket_service_1 = require('../../global/socket.service');
describe('LoginComponent', function () {
    let de;
    let comp;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule,
                forms_1.FormsModule],
            declarations: [login_component_1.LoginComponent],
            providers: [socket_service_1.SocketService]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
        comp = fixture.componentInstance;
    });
    it('should create component', () => expect(comp).toBeDefined());
});
//# sourceMappingURL=login.component.spec.js.map