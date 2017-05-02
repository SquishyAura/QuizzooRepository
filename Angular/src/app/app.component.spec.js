"use strict";
const app_component_1 = require('./app.component');
const testing_1 = require('@angular/core/testing');
const testing_2 = require('@angular/router/testing');
const socket_service_1 = require('./global/socket.service');
describe('AppComponent', function () {
    let de;
    let comp;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule],
            declarations: [app_component_1.AppComponent],
            providers: [socket_service_1.SocketService]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        comp = fixture.componentInstance;
    });
    it('should create component', () => expect(comp).toBeDefined());
});
//# sourceMappingURL=app.component.spec.js.map