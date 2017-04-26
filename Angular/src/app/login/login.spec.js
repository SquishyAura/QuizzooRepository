"use strict";
var login_component_1 = require('./login.component');
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
describe('logincomponent', function () {
    var logcomp;
    var fixture;
    var de;
    var htl;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [login_component_1.LoginComponent]
        });
    });
    fixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
    logcomp = fixture.componentInstance;
    de = fixture.debugElement.query(platform_browser_1.By.css('.loginMenuContainer'));
    htl = de.nativeElement;
});
//# sourceMappingURL=login.spec.js.map